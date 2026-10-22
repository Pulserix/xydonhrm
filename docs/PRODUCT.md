# XydonHRM — Product Document

**Version**: 0.1 — October 2026
**Philosophy**: Flow-driven architecture

---

## 1. Core Philosophy

XydonHRM is not a collection of features. It is a collection of flows.

A feature is a button or a form. A flow is a business outcome — something that starts, moves through actors and decisions, and ends with a state change that matters to the business.

**Wrong framing** (feature-driven):
> "Leave Management — apply leave, view balance, configure policies, approve/reject, carry-forward rules, encashment"

**Right framing** (flow-driven):
> "Employee applies for leave → system validates balance and policy → manager is notified → manager decides → balance updates → attendance pre-fills → payroll is flagged if unpaid"

Every screen, every button, every API endpoint in XydonHRM must belong to a flow. Nothing exists in isolation. If you cannot name which flow a screen serves, that screen should not exist.

---

## 2. What a Flow Is

Each flow has exactly six components:

| Component | Description |
|-----------|-------------|
| **Trigger** | What starts the flow |
| **Actors** | Who participates (employee, manager, HR, system) |
| **Steps** | Ordered actions and decisions |
| **Exception paths** | What happens when things go wrong |
| **Outcome** | Final state — what changed |
| **Data touched** | Which entities this flow reads and writes |

Flows can call other flows. Leave Apply calls the Approval Engine flow. Payroll Run calls the Statutory Calculation flow. This is how shared infrastructure emerges naturally.

---

## 3. Core Infrastructure

These are not flows themselves — they are engines that flows run on. Build these first. Every Phase 1 flow depends on them.

### 3.1 Approval Engine
Generic multi-level approval system used by leave, expenses, payroll, promotions, exits. Configurable per flow: number of levels, escalation rules, delegation, SLA timers.

### 3.2 Notification Dispatcher
Sends in-app, email, and (later) SMS/WhatsApp notifications. Every flow step that involves a human decision triggers a notification. Templated, not hardcoded.

### 3.3 Policy Evaluator
Rules engine that answers policy questions at runtime: "Does this employee have enough leave balance?", "Is this payroll deduction within statutory limits?", "Is this salary structure valid for this employee grade?". Policies are configured by company admins, not hardcoded.

### 3.4 Document Generator
Template-based generator for offer letters, appointment letters, payslips, confirmation letters, increment letters, relieving letters. Templates use merge fields from employee and flow data.

### 3.5 Audit Trail
Every state change in every flow is timestamped and attributed to an actor. Immutable. Required for compliance and dispute resolution.

### 3.6 Effective Date Engine
Salary changes, designations, grade changes, policy assignments — all take effect on a specific date, not immediately. Past records must remain queryable. Every entity that changes over time must be versioned with effective dates.

---

## 4. Core Data Model

Flows operate on entities. These are the entities that matter.

### Company
```
Company
  ├── LegalEntity (one company may have multiple legal entities for GST/PF purposes)
  ├── Branch (physical locations)
  ├── Department
  ├── Designation
  ├── Grade (salary band category)
  └── HolidayCalendar
```

### Employee
```
Employee (the spine — everything connects here)
  ├── PersonalInfo (name, DOB, gender, contact)
  ├── EmploymentInfo (joining date, employee ID, branch, department, designation, grade)
  ├── SalaryHistory (effective-dated salary records)
  ├── DesignationHistory (effective-dated designation changes)
  ├── DocumentStore (Aadhaar, PAN, offer letter, appointment letter, etc.)
  ├── BankDetails (account number, IFSC — for payroll disbursement)
  ├── StatutoryDetails (UAN for PF, ESI number, PAN for TDS)
  └── ReportingLine (who this employee reports to, effective-dated)
```

### Leave
```
LeavePolicy (company-level: leave type, accrual rules, carry-forward rules, encashment)
  └── LeaveBalance (per employee, per leave type, per year)
      └── LeaveTransaction (every credit/debit with reason and date)

LeaveRequest
  ├── Employee
  ├── LeaveType
  ├── DateRange
  ├── Status (DRAFT → PENDING → APPROVED/REJECTED/CANCELLED)
  └── ApprovalTrail
```

### Attendance
```
AttendanceRecord (per employee, per day)
  ├── Source (biometric / mobile / manual)
  ├── ClockIn, ClockOut
  ├── Status (PRESENT / ABSENT / HALF_DAY / ON_LEAVE / HOLIDAY / WEEK_OFF)
  └── OvertimeMinutes

AttendanceCorrection
  ├── OriginalRecord
  ├── CorrectedValues
  └── ApprovalTrail

MonthlyAttendanceSummary (per employee, per month — input to payroll)
  ├── PayableDays
  ├── UnpaidLeaveDays
  └── OvertimeHours
```

### Payroll
```
SalaryStructure (template: list of components with formulas)
  └── SalaryStructureAssignment (per employee, effective-dated)

SalaryComponent (Basic, HRA, Special Allowance, PF, ESI, PT, TDS, etc.)
  ├── ComponentType (EARNING / DEDUCTION / STATUTORY)
  ├── CalculationBasis (FIXED / PERCENTAGE_OF_BASIC / FORMULA)
  └── StatutoryConfig (PF rate, ESI rate, PT state, TDS slab)

PayrollRun (per company, per pay period)
  ├── Status (DRAFT → INPUTS_LOCKED → CALCULATED → APPROVED → DISBURSED)
  ├── PayPeriod
  └── PayrollInputs (attendance summary, approved leaves, ad-hoc additions/deductions)

PayrollSlip (per employee, per PayrollRun)
  ├── Earnings breakdown
  ├── Deductions breakdown
  ├── NetPay
  └── StatutoryContributions (PF employer, ESI employer)

StatutoryFilingRecord
  ├── FilingType (PF_ECR / ESI_RETURN / FORM_24Q / TDS_CHALLAN)
  └── PeriodCovered
```

### Recruitment
```
JobOpening
  ├── Department, Designation, Grade
  ├── Status (OPEN / ON_HOLD / CLOSED)
  └── HiringManager

Candidate
  ├── ApplicationStage (APPLIED → SCREENING → INTERVIEW → OFFER → JOINED / REJECTED)
  ├── InterviewRounds
  └── OfferDetails

Offer
  ├── SalaryBreakdown
  ├── Status (DRAFT → SENT → ACCEPTED / DECLINED)
  └── JoiningDate
```

---

## 5. Flow Catalog

### Phase 1 — Foundation Flows

---

#### F-01: Company Setup Flow

**Trigger**: Admin creates company account for the first time
**Actors**: Company Admin
**Steps**:
1. Create company profile (name, legal entity, PAN, GSTIN, registered address)
2. Add branches
3. Create department tree
4. Create designations and grades
5. Configure statutory settings (PF applicable?, ESI applicable?, PT state)
6. Configure holiday calendar (national + regional holidays)
7. Create first Admin user

**Outcome**: Company is configured and ready to onboard employees
**Data touched**: Company, LegalEntity, Branch, Department, Designation, Grade, HolidayCalendar, User

---

#### F-02: Employee Create Flow

**Trigger**: HR Admin creates a new employee record (can also be triggered by F-09 Hire Flow completing)
**Actors**: HR Admin
**Steps**:
1. Enter personal information
2. Enter employment details (joining date, designation, grade, department, branch, reporting manager)
3. Assign salary structure + enter CTC
4. Collect bank details
5. Collect statutory details (PAN, Aadhaar — for TDS and PF)
6. Upload documents (offer letter, appointment letter, address proof)
7. Set system access role (employee / manager / HR / admin)
8. System generates employee ID
9. Welcome email sent to employee with ESS login credentials

**Outcome**: Employee exists in system, can log in, payroll can process them
**Data touched**: Employee (all sub-entities), User, SalaryStructureAssignment

---

#### F-03: Leave Apply Flow

**Trigger**: Employee submits leave request
**Actors**: Employee, Reporting Manager, HR Admin (exception path)
**Steps**:
1. Employee selects leave type, start date, end date, reason
2. Policy Evaluator checks: balance sufficient? dates overlap existing approved leave? dates fall on holidays/weekends?
3. If balance insufficient → rejected immediately with balance shown
4. If valid → status set to PENDING, enters Approval Engine
5. Reporting Manager notified (in-app + email)
6. Manager approves, rejects, or requests modification
7. If approved: LeaveBalance debited, AttendanceRecords pre-filled as ON_LEAVE
8. If LWP (leave without pay): PayrollInput flagged for deduction
9. Employee notified of outcome

**Exception paths**:
- Manager inactive/on leave → escalates to HR Admin after configurable SLA (default 24h)
- Employee cancels before approval → auto-cancelled, no balance impact
- Employee cancels after approval → triggers F-04 Leave Cancel Flow

**Outcome**: Approved leave with balance deducted and attendance pre-filled, OR rejected with reason
**Data touched**: LeaveRequest, LeaveBalance, LeaveTransaction, AttendanceRecord, PayrollInput, ApprovalTrail

---

#### F-04: Leave Cancel Flow

**Trigger**: Employee cancels a previously approved leave
**Actors**: Employee, HR Admin
**Steps**:
1. Employee submits cancellation request with reason
2. If leave dates are in the future → HR Admin approves cancellation
3. If leave dates are in the past → HR Admin reviews (attendance may need correction)
4. On approval: LeaveBalance credited back, AttendanceRecords reverted, PayrollInput updated

**Outcome**: Leave cancelled, balance restored
**Data touched**: LeaveRequest, LeaveBalance, LeaveTransaction, AttendanceRecord, PayrollInput

---

#### F-05: Attendance Record Flow

**Trigger**: Employee clocks in or out (via mobile / biometric / manual entry)
**Actors**: Employee, System
**Steps**:
1. Employee marks attendance (source tagged)
2. System records timestamp, source, location (if mobile geo)
3. At end of day: system computes status from clock-in/out times vs shift schedule
4. Status determined: PRESENT / HALF_DAY / ABSENT / SHORT_HOURS
5. If ABSENT and no approved leave: anomaly flagged to HR dashboard

**Outcome**: Daily attendance record created with status
**Data touched**: AttendanceRecord, ShiftSchedule

---

#### F-06: Attendance Correction Flow

**Trigger**: Employee or HR Admin submits correction for an attendance record
**Actors**: Employee, Reporting Manager
**Steps**:
1. Employee submits correction request (missed punch, wrong status) with reason
2. Enters Approval Engine with Reporting Manager
3. Manager approves or rejects with reason
4. If approved: AttendanceRecord updated with corrected values, original preserved in audit trail

**Outcome**: Attendance corrected and traceable
**Data touched**: AttendanceRecord, AttendanceCorrection, ApprovalTrail

---

#### F-07: Monthly Attendance Closure Flow

**Trigger**: HR Admin closes attendance for the month (must happen before payroll run)
**Actors**: HR Admin
**Steps**:
1. HR reviews exception dashboard (unresolved absences, pending corrections, unmarked days)
2. HR resolves or overrides remaining exceptions
3. System computes MonthlyAttendanceSummary per employee: payable days, LWP days, overtime hours
4. HR locks attendance period — no further corrections allowed
5. PayrollInputs created from attendance summaries, ready for payroll run

**Outcome**: Attendance locked, payroll inputs ready
**Data touched**: AttendanceRecord, MonthlyAttendanceSummary, PayrollInput

---

### Phase 2 — Daily Operations Flows

---

#### F-08: Candidate Apply Flow

**Trigger**: Candidate applies for a job opening (from career page or HR-added manually)
**Actors**: Candidate, Recruiter, Hiring Manager
**Steps**:
1. Candidate submits application (resume, basic details)
2. Recruiter screens: move to SHORTLISTED or REJECTED
3. Interview rounds scheduled (each round: interviewer assigned, date/time, format)
4. Interviewers submit scorecards after each round
5. Hiring Manager reviews aggregate scorecard → OFFER or REJECT decision
6. On OFFER decision → triggers F-09 Offer Flow

**Outcome**: Candidate rejected, or progressed to offer stage
**Data touched**: JobOpening, Candidate, InterviewRound, Scorecard

---

#### F-09: Offer and Hire Flow

**Trigger**: Hiring Manager approves offer for a candidate
**Actors**: HR Admin, Candidate
**Steps**:
1. HR Admin prepares offer: salary structure, CTC, joining date, designation, grade
2. Offer enters approval flow (if multi-level approval configured)
3. Document Generator produces offer letter from template
4. Offer sent to candidate (email with PDF + digital acceptance link)
5. Candidate accepts or declines
6. If accepted: Candidate status → HIRED, joining date confirmed
7. Triggers F-10 Employee Join Flow on joining date

**Outcome**: Offer accepted and joining date locked, or declined
**Data touched**: Offer, Candidate, JobOpening

---

#### F-10: Employee Join Flow (Onboarding)

**Trigger**: Accepted offer's joining date arrives
**Actors**: HR Admin, IT Admin, Reporting Manager, Employee
**Steps**:
1. HR collects joining documents (Aadhaar, PAN, bank details, previous experience letters)
2. HR creates employee record in system (triggers F-02 Employee Create Flow)
3. IT checklist created: laptop, email account, system access, tools
4. Reporting Manager assigned induction plan
5. Probation period started (configured duration, typically 3–6 months)
6. Employee logs into ESS portal for the first time
7. Employee completes profile (emergency contact, nominee details, tax declarations)

**Outcome**: Employee is active in system, probation tracking begun, IT provisioned
**Data touched**: Employee, OnboardingChecklist, ProbationRecord, TaxDeclaration

---

#### F-11: Probation and Confirmation Flow

**Trigger**: Probation end date approaches (auto-triggered by system, configurable days before)
**Actors**: Reporting Manager, HR Admin
**Steps**:
1. System alerts Reporting Manager: probation ending in N days
2. Manager submits probation review (performance rating, recommendation: CONFIRM / EXTEND / TERMINATE)
3. HR Admin reviews recommendation
4. If CONFIRM: employee designation may change (Trainee → confirmed title), confirmation letter generated
5. If EXTEND: new probation end date set, reason recorded
6. If TERMINATE: triggers exit flow with probation termination reason

**Outcome**: Employee confirmed, probation extended, or exit initiated
**Data touched**: ProbationRecord, Employee (designation update), DocumentGenerator

---

#### F-12: Payroll Run Flow

**Trigger**: HR Admin initiates payroll run for a pay period
**Actors**: HR Admin, Finance Approver
**Steps**:
1. HR verifies prerequisites: attendance closed (F-07), all leave inputs reconciled
2. HR initiates PayrollRun — status: DRAFT
3. System calculates gross pay per employee from salary structures
4. System applies inputs: LWP deductions, overtime additions, ad-hoc additions/deductions
5. Statutory Engine computes: PF (employee 12% + employer 12%), ESI (employee 0.75% + employer 3.25%), PT (state-wise table), TDS (slab-based)
6. HR reviews payroll register — anomaly alerts shown (salary changed? new joiner? full/final?)
7. HR locks inputs — status: INPUTS_LOCKED
8. Finance approves payroll — status: APPROVED
9. System generates bank disbursement file (NEFT/RTGS format)
10. System generates statutory files (PF ECR, ESI return, TDS challan)
11. Payslips generated per employee — status: DISBURSED
12. Payslips released to employee ESS portals

**Exception paths**:
- Negative net pay: flagged separately, requires manual override
- New joiner (partial month): system pro-rates salary from joining date
- Exit during pay period: F-17 Full & Final Flow handles separately

**Outcome**: Salaries disbursed, statutory filings ready, payslips visible to employees
**Data touched**: PayrollRun, PayrollSlip, StatutoryFilingRecord, BankDisbursementFile, PayrollInput

---

#### F-13: Expense Claim Flow

**Trigger**: Employee submits expense claim with receipts
**Actors**: Employee, Reporting Manager, Finance
**Steps**:
1. Employee creates claim: category, amount, date, description, receipt upload
2. Policy Evaluator checks: within policy limits? valid category?
3. Enters Approval Engine — Reporting Manager
4. Manager approves/rejects each line item or full claim
5. Finance reviews approved claims, processes reimbursement
6. Amount credited to employee bank account (or included in next payroll)

**Outcome**: Expense reimbursed or rejected
**Data touched**: ExpenseClaim, ExpenseItem, ApprovalTrail, PayrollInput (if payroll-included)

---

### Phase 3 — Employee Lifecycle Flows

---

#### F-14: Performance Review Flow

**Trigger**: HR Admin initiates review cycle (annual / mid-year / probation)
**Actors**: Employee, Reporting Manager, HR Admin
**Steps**:
1. Employee submits self-appraisal (goals achieved, ratings, comments)
2. Manager reviews self-appraisal, submits manager evaluation
3. If 360-degree: peer feedback collected from configured reviewers
4. HR Admin normalizes ratings across department (calibration)
5. Final rating assigned to employee
6. If rating triggers compensation review → F-15 Compensation Review Flow

**Outcome**: Employee has finalized performance rating for the cycle
**Data touched**: ReviewCycle, PerformanceReview, Goal, Rating

---

#### F-15: Compensation Review Flow

**Trigger**: Performance review cycle completes, or HR Admin manually initiates
**Actors**: HR Admin, Finance Approver, Department Head
**Steps**:
1. HR Admin views department salary band vs current salaries
2. Increment recommendations entered per employee (% or fixed amount)
3. Multi-level approval (Department Head → Finance)
4. On approval: new salary effective from configured date (not today)
5. Effective Date Engine creates new SalaryHistory record
6. Document Generator creates increment letters
7. Letters released to employee ESS

**Outcome**: Salary revised with effective date, increment letter issued
**Data touched**: SalaryHistory, SalaryStructureAssignment, CompensationReview, DocumentGenerator

---

#### F-16: Transfer and Promotion Flow

**Trigger**: HR Admin initiates transfer (location/department change) or promotion (designation/grade change)
**Actors**: HR Admin, Reporting Manager
**Steps**:
1. HR selects employee, change type (transfer / promotion / both)
2. New values entered: branch / department / designation / grade / new reporting manager
3. Effective date set
4. Approval flow (if configured)
5. On approval: Employee record updated with effective date, old values preserved in history
6. Reporting line updated
7. Document Generator creates transfer/promotion letter

**Outcome**: Employee profile updated with effective-dated change, letter issued
**Data touched**: Employee (EmploymentInfo, DesignationHistory), ReportingLine, DocumentGenerator

---

#### F-17: Employee Exit Flow

**Trigger**: Employee submits resignation, or HR initiates exit (termination / retirement)
**Actors**: Employee, Reporting Manager, HR Admin, IT Admin, Finance
**Steps**:
1. Resignation submitted (or HR-initiated exit) — exit date and reason recorded
2. Reporting Manager acknowledges, sets handover plan
3. Exit checklist activated: asset return, knowledge transfer, access revocation schedule
4. Last working day confirmed
5. IT access closure scheduled on last working day
6. Finance calculates Full & Final settlement:
   - Pending salary (pro-rated for partial month)
   - Leave encashment (unconsumed earned leave × daily rate)
   - Gratuity (if applicable — 4 years 8+ months of service)
   - Deductions: pending advances, asset damages
7. FnF payroll run (separate from regular payroll)
8. FnF amount approved by Finance
9. Documents generated: relieving letter, experience letter, FnF settlement slip
10. Documents released to employee

**Outcome**: Employee exited cleanly, all financial obligations settled, documents issued
**Data touched**: ExitRecord, AssetReturn, AccessRevocation, FnFSettlement, PayrollSlip, DocumentGenerator

---

#### F-18: Document Generate Flow

**Trigger**: Called by other flows (offer, confirmation, increment, exit) or manually by HR
**Actors**: HR Admin (initiates), System (generates)
**Steps**:
1. Template selected (offer letter / appointment letter / confirmation / increment / relieving / experience)
2. System merges template with employee data + flow context data
3. PDF generated
4. Optionally: sent for e-signature
5. Filed to employee DocumentStore
6. Released to employee ESS (if employee-facing document)

**Outcome**: Document generated, stored, and delivered
**Data touched**: DocumentTemplate, DocumentStore, Employee

---

## 6. The Approval Engine (Shared Infrastructure)

Every flow that requires human sign-off calls the Approval Engine. It is not rebuilt per flow.

```
ApprovalRequest
  ├── FlowId (which flow triggered this)
  ├── EntityId (which entity needs approval — LeaveRequest, ExpenseClaim, etc.)
  ├── CurrentLevel (which approval level we are on)
  ├── Levels: [
  │     { approver: Manager, SLA: 24h, escalateTo: HR_Admin }
  │     { approver: Finance, SLA: 48h, escalateTo: CFO }
  │   ]
  ├── Status (PENDING / APPROVED / REJECTED / ESCALATED / DELEGATED)
  └── Trail: [ { actor, action, timestamp, comment } ]
```

**Behaviors**:
- SLA exceeded → auto-escalates to next-level or configured fallback
- Approver on leave → auto-delegates to their designated backup
- Any level rejects → entire request rejected, employee notified
- Final level approves → calling flow continues to outcome steps

---

## 7. Build Sequence

### Phase 1a — Core Foundation (Months 1–3)

Build these before anything user-facing:
- Multi-tenant company/employee data model
- Authentication and RBAC (company admin / HR admin / manager / employee roles)
- Approval Engine
- Notification Dispatcher
- Audit Trail
- Effective Date Engine
- F-01: Company Setup Flow
- F-02: Employee Create Flow

**Gate**: HR can create a company, add employees, and employees can log in. Nothing else.

---

### Phase 1b — Daily HR Operations (Months 3–5)

- Policy Evaluator (leave balance, leave type rules)
- F-03: Leave Apply Flow
- F-04: Leave Cancel Flow
- F-05: Attendance Record Flow
- F-06: Attendance Correction Flow
- F-07: Monthly Attendance Closure Flow
- Employee Self-Service portal (leave, attendance, profile)

**Gate**: Employees can apply leave, managers can approve, attendance can be tracked and closed for payroll.

---

### Phase 1c — Payroll (Months 5–8)

**Decision required first**: Build India payroll engine in-house OR integrate a payroll API.

If in-house:
- Salary structure engine
- Statutory Engine (PF, ESI, PT, TDS)
- F-12: Payroll Run Flow
- Payslip PDF generation
- Bank file generation (NEFT format)

**Gate**: HR can run payroll, employees can download payslips, statutory files are generated.

---

### Phase 2 — Recruitment + Onboarding (Months 8–11)

- F-08: Candidate Apply Flow
- F-09: Offer and Hire Flow
- F-10: Employee Join Flow
- F-11: Probation and Confirmation Flow
- Document Generator

**Gate**: Full hire-to-day-1 flow works end to end.

---

### Phase 2b — Financial Operations (Months 11–13)

- F-13: Expense Claim Flow
- Employee advances and loans

---

### Phase 3 — Lifecycle (Months 13–18)

- F-14: Performance Review Flow
- F-15: Compensation Review Flow
- F-16: Transfer and Promotion Flow
- F-17: Employee Exit Flow (Full & Final)

---

### Phase 4 — Advanced (Months 18+)

- AI HR Assistant (policy Q&A, document drafting, anomaly explanations)
- Custom workflow builder (HR teams configure their own flows)
- Advanced analytics and reporting
- Integrations (biometric devices, accounting, Google Workspace)
- Multi-company SaaS admin panel

---

## 8. Design Principles

**1. Every screen serves a flow.**
No orphaned pages. If you cannot draw the line from a screen to a flow and an outcome, remove it.

**2. The system moves, not the human.**
When a leave is approved, the balance updates automatically. When payroll is locked, attendance cannot be changed. Humans make decisions; the system handles consequences.

**3. Exceptions are first-class citizens.**
Every flow has exception paths designed upfront. The happy path is easy. The manager-on-leave escalation, the negative-payroll employee, the mid-month joiner — these are where real HRMS value lives.

**4. Audit everything.**
Every state change has: who, what, when, why. No silent overwrites.

**5. Effective dates, always.**
Anything that changes over time (salary, designation, reporting line, policy assignment) is versioned with effective dates. Historical data must be queryable for any past date.

**6. Flows over modules.**
When a feature is requested, ask first: which flow does this serve? Only then decide which module it lives in.
