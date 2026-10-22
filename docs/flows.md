# HRMS Flows — Master Reference
# Checkpoint doc: data model → state machine → screens per module
# Last updated: 2026-10-22

---

## Build Status

| Module | Page | Data | Flow | UI |
|--------|------|------|------|----|
| Dashboard | dashboard.html | — | — | DONE |
| Employees | employees.html | partial | partial | DONE |
| Leave | leave.html | partial | partial | DONE |
| Attendance | attendance.html | defined below | defined below | DONE |
| Recruitment | recruitment.html | defined below | defined below | DONE |
| Onboarding | onboarding.html | defined below | defined below | DONE |
| Payroll | payroll.html | defined below | defined below | DONE |
| Offboarding | offboarding.html | defined below | defined below | DONE |
| Settings | settings.html | defined below | defined below | DONE |

---

## Sidebar Nav Map (full)

```
--- MAIN ---
  Dashboard       dashboard.html
--- WORKFORCE ---
  Employees       employees.html
  Attendance      attendance.html
  Leave           leave.html
  Performance     (Phase 4)
  Training        (Phase 4)
  Engagement      (Phase 5)
--- HIRING ---
  Recruitment     recruitment.html
  Onboarding      onboarding.html
--- FINANCE ---
  Payroll         payroll.html
--- HR OPS ---
  Assets          (Phase 4)
  Promotions      (Phase 4)
  Disciplinary    (Phase 5)
  Helpdesk        (Phase 5)
  Compliance      (Phase 5)
  Offboarding     offboarding.html
--- CONFIG ---
  Analytics       (Phase 5)
  Settings        settings.html
```

---

## Shared Core Tables

Every module references these. Prototype uses static data that mirrors this shape.

```
organizations     id, name, country, timezone
branches          id, org_id, name, city, state
departments       id, org_id, name, parent_id
designations      id, org_id, title, grade
employees         id, emp_code, name, email, dept_id, branch_id, manager_id,
                  designation_id, joining_date, employment_type, status
employee_assignments  employee_id, dept_id, branch_id, manager_id, effective_from
users             id, employee_id, email, role, status
approval_requests id, type, resource_id, requester_id, status, steps[]
audit_logs        id, actor_id, action, resource, changed_at
```

Employee status values: ACTIVE | ON_LEAVE | PROBATION | NOTICE_PERIOD | INACTIVE

---

## Module 01 — Organization Setup (settings.html)

### Data
```
organizations     id, name, legal_name, gstin, address, logo
branches          id, org_id, name, address, city, state, pincode, is_hq
departments       id, org_id, name, parent_id, head_employee_id
designations      id, org_id, title, level, grade
holiday_calendars id, org_id, year, branch_id (null = all)
holidays          id, calendar_id, name, date, holiday_type
leave_types       id, org_id, name, code, accrual_rule, carry_forward, encashment
leave_policies    id, leave_type_id, employee_category, days_per_year
roles             id, org_id, name
permissions       role_id, resource, action
```

### Screens
1. Company Details — logo, name, gstin, address, timezone
2. Branches — list + add/edit
3. Departments — tree view + add/edit/set head
4. Designations — list + grade assignment
5. Holiday Calendar — year selector + monthly grid, add holiday
6. Leave Types — list + policy config per type
7. User Management — employees with login access, role assignment

---

## Module 02 — Recruitment (recruitment.html)

### Data
```
job_requisitions  id, dept_id, title, type(new/replacement), positions, salary_range,
                  required_by, status(DRAFT|PENDING_APPROVAL|APPROVED|CLOSED)
job_postings      id, requisition_id, description, skills, experience, employment_type,
                  closing_date, status(ACTIVE|CLOSED|PAUSED)
candidates        id, name, email, mobile, resume_url, source
applications      id, job_id, candidate_id, applied_at,
                  status(APPLIED|SCREENING|SHORTLISTED|INTERVIEW|SELECTED|OFFERED|HIRED|REJECTED|WITHDRAWN)
interviews        id, application_id, round, interviewer_id, scheduled_at, mode, link
interview_feedback id, interview_id, scores{}, recommendation, notes, evaluator_id
offers            id, application_id, ctc, joining_date, validity, status(DRAFT|SENT|ACCEPTED|DECLINED)
```

### State Machine: Application
```
APPLIED → SCREENING → SHORTLISTED → INTERVIEW → SELECTED → OFFERED → HIRED
                  ↓              ↓           ↓          ↓         ↓
               REJECTED      REJECTED    REJECTED  WITHDRAWN  DECLINED
```

### Screens
1. Recruitment Dashboard — open jobs count, pipeline counts per stage, recent activity
2. Job Postings — table: title, dept, positions, applications, status
3. Candidate Pipeline — tab per job → kanban board with stage columns, candidate cards
4. Interview Scheduler — calendar + pending scheduling items
5. Offers — table: candidate, job, CTC, status, expiry; actions: send, withdraw
6. Modals: Create Job Posting, Schedule Interview, Prepare Offer

---

## Module 03 — Onboarding (onboarding.html)

### Data
```
onboarding_cases  id, employee_id, joining_date, status(INVITED|DOCS_PENDING|VERIFICATION|READY|ACTIVE)
onboarding_tasks  id, case_id, category, title, owner_type(HR|IT|ADMIN|MANAGER|EMPLOYEE),
                  due_date, status(PENDING|IN_PROGRESS|DONE|BLOCKED)
employee_documents id, employee_id, type, file_url, verified, verified_by, verified_at, expiry_date
document_verifications id, document_id, verified_by, result, remarks, verified_at
```

### State Machine: Onboarding Case
```
OFFER_ACCEPTED → INVITED → DOCS_PENDING → UNDER_VERIFICATION → READY_TO_JOIN → ACTIVE
                                                ↓ (missing docs)
                                          DOCS_PENDING (back)
```

### Screens
1. Onboarding Dashboard — new joiners this month, avg completion %, overdue tasks
2. Joiner List — table: name, joining date, status badge, completion %
3. Joiner Detail (side panel or page) — profile stub + checklist (tasks grouped by owner) + document list
4. Document Verification — doc viewer + verify/reject actions
5. Activate Employee button — visible when all required tasks DONE

---

## Module 04 — Employee Database (employees.html — DONE)

### Data (existing page covers)
```
employees         id, emp_code, name, email, mobile, dept, designation, branch,
                  manager, joining_date, employment_type, status
employee_documents id, type, file, verified, expiry
employment_history employee_id, change_type, from_value, to_value, effective_date
```

### State Machine: Employee
```
ONBOARDING → PROBATION → ACTIVE → NOTICE_PERIOD → SEPARATED
                ↓                   ↓
           CONFIRMED           (resigned/terminated/retired)
```

### Screens (DONE)
- Employee directory table + filter bar
- Side panel: Employment / Contact / Leave Balances / Timeline tabs
- Add Employee modal

---

## Module 05 — Attendance (attendance.html)

### Data
```
shift_templates   id, org_id, name, start_time, end_time, break_mins,
                  grace_late_mins, grace_early_mins, is_overnight, weekly_offs[]
shift_assignments id, employee_id, shift_id, valid_from, valid_to
attendance_punches id, employee_id, punched_at, type(IN|OUT), source(APP|BIOMETRIC|MANUAL)
attendance_daily  id, employee_id, date, shift_id,
                  check_in, check_out, work_hours, break_hours,
                  status(PRESENT|ABSENT|LATE|HALF_DAY|ON_LEAVE|HOLIDAY|WEEK_OFF),
                  is_regularized
attendance_adjustments id, attendance_daily_id, requested_by, requested_in, requested_out,
                  reason, attachment_url, status(PENDING|APPROVED|REJECTED), approved_by
overtime_requests id, employee_id, date, start_time, end_time, reason,
                  eligible_hours, status(PENDING|APPROVED|REJECTED)
```

### State Machine: Daily Attendance
```
Raw punches → Calculated status:
  check_in on time        → PRESENT
  check_in after grace    → LATE
  no check_in             → ABSENT (or ON_LEAVE if leave approved)
  check_out before time   → HALF_DAY (policy-based)
  public holiday          → HOLIDAY
  configured week off     → WEEK_OFF
```

### Correction Flow
```
Employee raises correction → Manager reviews → APPROVED → attendance_daily recalculated
                                             → REJECTED → employee notified
```

### Screens
1. Attendance Dashboard — today's counts (Present/Absent/Late/On Leave)
2. Daily View tab — date picker + table: emp, check-in, check-out, hours, status + correct action
3. Monthly View tab — calendar grid per employee (heatmap of status)
4. Corrections tab — pending correction requests table with approve/reject
5. Overtime tab — pending overtime requests
6. Shift Management tab — shift templates list + roster
7. Lock Attendance action — month-end lock (HR only)

---

## Module 06 — Leave (leave.html — DONE)

### Data
```
leave_types       id, name, code, color
leave_balances    id, employee_id, leave_type_id, year, total, used, pending, available
leave_requests    id, employee_id, leave_type_id, start_date, end_date, days,
                  half_day_flag, reason, attachment, status(DRAFT|PENDING|APPROVED|REJECTED|WITHDRAWN|CANCELLED)
leave_ledger      id, leave_balance_id, request_id, transaction_type(CREDIT|DEBIT|REVERSAL), days, date
holiday_calendars id, org_id, year
holidays          id, calendar_id, name, date, type(NATIONAL|REGIONAL|OPTIONAL)
```

### State Machine
```
DRAFT → PENDING (submitted) → APPROVED → (on return) COMPLETED
                            → REJECTED
              ↓ (before approval)
           WITHDRAWN
        (after approval, before start)
           CANCELLED (needs separate approval depending on policy)
```

### Screens (DONE)
- Pending Requests tab: approve/reject inline
- Balances tab: employee balance cards by leave type
- Calendar tab: monthly grid with leave events
- Policy tab: leave type policy cards

---

## Module 07 — Payroll (payroll.html)

### Data
```
salary_components id, org_id, name, type(EARNING|DEDUCTION|EMPLOYER), calculation_type,
                  formula, is_statutory
salary_structures id, org_id, name, components[]
employee_compensation id, employee_id, structure_id, effective_date, ctc, breakdown{}
payroll_periods   id, org_id, year, month, start_date, end_date,
                  status(OPEN|INPUTS_LOCKED|DRAFT|UNDER_REVIEW|APPROVED|LOCKED|PAID)
payroll_runs      id, period_id, generated_at, generated_by, status
payroll_items     id, run_id, employee_id, payable_days, lop_days,
                  earnings{}, deductions{}, gross, net, status
payroll_adjustments id, run_id, employee_id, type, amount, reason
payslips          id, run_id, employee_id, gross, net, generated_at, delivered_at
payment_batches   id, run_id, total_amount, bank_file_url, payment_status, payment_date
```

### State Machine: Payroll Period
```
OPEN
  → (cutoff) INPUTS_LOCKED
  → (generate) DRAFT
  → (HR submit) UNDER_REVIEW
  → (Finance approve) APPROVED
  → (lock) LOCKED       ← immutable after this
  → (payslips generated, bank file exported) PAID
```

### Screens
1. Payroll Dashboard — current month status timeline, employee counts, gross/net totals
2. Payroll Runs list — past months with status badges
3. Run Detail — employee-wise payroll items table, exceptions highlighted
4. Payslip Preview modal — print-ready payslip layout
5. Salary Structures — template list + component breakdown
6. Modals: Generate Payroll, Submit for Approval, Lock, Export Bank File

---

## Module 08 — Performance (future — Phase 4)

### Data
```
review_cycles     id, org_id, name, year, quarter, start_date, end_date, status
performance_goals id, cycle_id, employee_id, kpi_name, target, weight, progress, status
performance_reviews id, goal_id, self_rating, self_comments, manager_rating, manager_comments,
                    final_rating, status(SELF_PENDING|MANAGER_PENDING|CALIBRATION|FINALIZED)
improvement_plans id, employee_id, gap, actions[], review_date, status
```

### State Machine
```
CYCLE OPEN → Goals Assigned → SELF_REVIEW_OPEN → SELF_SUBMITTED
  → MANAGER_REVIEW → MANAGER_SUBMITTED → CALIBRATION → FINALIZED
```

---

## Module 09 — Training (future — Phase 4)

### Data
```
courses           id, title, trainer, delivery_type, duration, validity_days, is_mandatory
training_assignments id, course_id, employee_id, due_date, status
training_enrollments id, assignment_id, session_id, attended, score, passed
certifications    id, employee_id, course_id, issued_at, expires_at
```

---

## Module 10-12 (Engagement, Helpdesk, Compliance) — Phase 5

Not prototyped in Phase 1.

---

## Module 14 — Assets (future — Phase 4)

### Data
```
assets            id, code, category, model, serial, condition, status(AVAILABLE|ASSIGNED|REPAIR|RETIRED)
asset_assignments id, asset_id, employee_id, assigned_at, condition, returned_at, return_condition
asset_clearances  id, employee_id, exit_request_id, status, cleared_by
```

---

## Module 15 — Promotions/Transfers (future — Phase 4)

### Data
```
employee_change_requests id, employee_id, type(PROMOTION|TRANSFER|SALARY_REVISION|DESIGNATION_CHANGE),
                          current_value, proposed_value, effective_date, justification, status
employment_letters id, request_id, type, content, signed_at
```

---

## Module 16 — Disciplinary (future — Phase 5, restricted access)

---

## Module 17 — Offboarding (offboarding.html)

### Data
```
exit_requests     id, employee_id, submitted_at, last_working_day, reason, notice_days,
                  status(SUBMITTED|ACKNOWLEDGED|IN_NOTICE|CLEARANCE_PENDING|CLEARED|SETTLED|ARCHIVED)
offboarding_tasks id, exit_id, department, task, assignee_id, due_date,
                  status(PENDING|IN_PROGRESS|DONE|WAIVED)
department_clearances id, exit_id, dept_name, cleared_by, cleared_at, remarks
exit_interviews   id, exit_id, interviewer_id, responses{}, conducted_at
final_settlements id, exit_id, payable_days, leave_encashment, deductions,
                  net_payable, status(DRAFT|REVIEW|APPROVED|PAID), approved_by
```

### State Machine: Exit Request
```
SUBMITTED
  → ACKNOWLEDGED (HR confirms last working day)
  → IN_NOTICE (notice period running)
  → CLEARANCE_PENDING (all departments to sign off)
  → CLEARED (all clearances done + exit interview done)
  → SETTLED (FnF calculated + approved + paid)
  → ARCHIVED
```

### Screens
1. Offboarding Dashboard — active separations, clearance pending counts, overdue
2. Separation List — table: name, dept, last working day, status badge
3. Separation Detail (panel) — tabs: Checklist | Clearances | FnF | Exit Interview
4. Clearance tracker — per-dept sign-off table
5. FnF Summary card — salary days, leave encashment, deductions, net
6. Approve Resignation modal + FnF Approve modal

---

## Module 18 — Analytics (dashboard.html + future reports page)

Key metrics surfaced on dashboard already. Full analytics page is Phase 5.

---

## Page-Level Notes

### How pages connect
- employees.html → attendance.html (click "View Attendance" in employee panel)
- employees.html → leave.html (click "Leave Balance" in employee panel)
- recruitment.html → onboarding.html (Offer Accepted triggers onboarding case)
- offboarding.html ← employees.html (Initiate Resignation from employee actions)
- payroll.html reads from attendance (LOP days) and leave (approved leaves)

### Common component patterns used
- Stat cards row at top (4 cards)
- Tab bar for sub-sections
- Filter bar (search + dropdowns)
- Table with status badges
- Right slide-in panel for detail
- Modal for create/edit/approve actions
- Toast for action feedback

### Design system files
- tokens.css — CSS custom properties
- components.css — all UI components
- utilities.css — layout + helpers
- theme.js — runtime accent + dark/light toggle
