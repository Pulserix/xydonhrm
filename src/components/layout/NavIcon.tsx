'use client';

import React from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import SwapHorizOutlinedIcon from '@mui/icons-material/SwapHorizOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const iconMap: Record<string, React.ElementType> = {
  Dashboard:      DashboardOutlinedIcon,
  Employees:      PeopleOutlinedIcon,
  Organization:   BusinessOutlinedIcon,
  Attendance:     AccessTimeOutlinedIcon,
  Leave:          CalendarMonthOutlinedIcon,
  Shifts:         WatchLaterOutlinedIcon,
  Documents:      FolderOutlinedIcon,
  Performance:    TrendingUpOutlinedIcon,
  Training:       SchoolOutlinedIcon,
  Engagement:     FavoriteBorderIcon,
  Recruitment:    EmojiEventsOutlinedIcon,
  Onboarding:     PersonAddOutlinedIcon,
  Payroll:        AccountBalanceOutlinedIcon,
  Assets:         LaptopOutlinedIcon,
  Promotions:     SwapHorizOutlinedIcon,
  Disciplinary:   GavelOutlinedIcon,
  Helpdesk:       SupportAgentOutlinedIcon,
  Compliance:     VerifiedOutlinedIcon,
  Offboarding:    ExitToAppOutlinedIcon,
  Analytics:      BarChartOutlinedIcon,
  Settings:       SettingsOutlinedIcon,
  Compensation:   MonetizationOnOutlinedIcon,
  Expenses:       ReceiptOutlinedIcon,
  Statutory:      AccountBalanceWalletOutlinedIcon,
  Approvals:      TaskAltOutlinedIcon,
  Timesheets:     AccessTimeOutlinedIcon,
  'Data Import':  UploadFileOutlinedIcon,
  Insights:       InsightsOutlinedIcon,
  'AI Assistant': AutoAwesomeOutlinedIcon,
  Benefits:       CardGiftcardOutlinedIcon,
  Headcount:      GroupsOutlinedIcon,
  Contractors:    HandshakeOutlinedIcon,
  Workflows:      AccountTreeOutlinedIcon,
  Integrations:   ExtensionOutlinedIcon,
  Communications: CampaignOutlinedIcon,
  Security:       LockOutlinedIcon,
  Billing:        CreditCardOutlinedIcon,
};

export default function NavIcon({ label }: { label: string }) {
  const Icon = iconMap[label] ?? DashboardOutlinedIcon;
  return <Icon sx={{ fontSize: 16 }} />;
}
