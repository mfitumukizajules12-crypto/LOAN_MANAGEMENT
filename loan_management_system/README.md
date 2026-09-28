# CEMU–SNW Social & Savings Association Management System

**Production URL:** [https.cemu.snwgi.rw](https.cemu.snwgi.rw)

An enterprise-grade, web-based financial management platform designed to automate and streamline the operations of the CEMU–SNW Social & Savings Association. The platform manages social fund cash books, member savings portfolios, loan workflows, interest distributions, and dual-authorization administrative approvals.

---

## 🚀 Project Overview

The CEMU–SNW Management System replaces manual spreadsheets and paper-based tracking with an automated, auditable, and secure platform.

### Key Objectives
* **Social Fund Management:** Real-time cash book tracking for monthly contributions and welfare benefit payouts.
* **Savings Tracking:** Member savings ledgers, single non-refundable share capital records, and proportional interest distribution algorithms.
* **Loan Lifecycle Engine:** Automated eligibility calculations, multi-stage approval workflows, and installment tracking.
* **Governance & Compliance:** Dual-authorization enforcement (Accountant entry $\rightarrow$ Officer/President approval), audit logging, and automated report generation.

---

## 🛠️ Tech Stack & Requirements

### Frontend & Backend Framework
* **[Next.js](https://nextjs.org/)** (App Router) – Full-stack React framework for Server-Side Rendering (SSR), Server Actions, and REST/API endpoints.
* **React** – Dynamic component architecture for user dashboards and financial tables.

### Security & Authentication
* **[bcrypt](https://www.npmjs.com/package/bcrypt)** – Password hashing with a **salt round factor of 10** for secure credential storage.
* **[Zod](https://zod.dev/)** – Schema validation for API payloads, server actions, and client-side forms.
* **Role-Based Access Control (RBAC):** Restrictive routes enforced for `admin`, `president`, `loan_officer`, `accountant`, and `member`.

### Database & ORM
* **MySQL** – Relational Database Management System (RDBMS) configured with `InnoDB` engines and strict foreign key integrity constraints.

---

## 📊 Business Logic & Key Formulas

### 1. Social Fund Module
* **Monthly Contribution:** Fixed at **10,000 FRW** per member via payroll deduction.
* **Standard Welfare Benefits:**
  * **ICU Support:** 1,000,000 FRW
  * **Death Benefit:** 500,000 FRW
  * *Other benefits configurable by system administrators.*

### 2. Savings Management Module
* **Share Capital:** One-time, non-refundable capital of **50,000 FRW**.
* **Minimum Monthly Savings:** **15,000 FRW**.
* **Interest Calculation:** Distributed proportionally to members based on individual total savings balances relative to total group savings.

### 3. Loan Management & Eligibility Engine
* **Loan Eligibility Limit Formula:**
  $$\text{Loan Limit} = \left(\frac{\text{Monthly Savings}}{3} \times 24\right) + \text{Total Savings}$$
* **Maximum Loan Allowed:** **5,000,000 FRW**.
* **Interest Rate:** **5%** simple interest.
* **Maximum Duration:** **24 Months**.
* **Loan Repayment Formula:**
  $$\text{Total Payable} = \text{Principal} + (\text{Principal} \times \text{Rate} \times \text{Time})$$
* **Withdrawal Constraint:** Members cannot withdraw accumulated savings if they have an active outstanding loan balance (unless requesting a formal **Loan Offset**).

---

## 👥 Role-Based Access Matrix

| Role | Permissions & Responsibilities |
| :--- | :--- |
| **Member** | View personal savings ledgers, active/repaid loan balances, submit loan applications, request contribution adjustments, and view contribution history. |
| **Accountant** | Manage cash book transactions, post payroll bulk contributions, initiate benefit disbursements, log manual repayments, and generate financial reports. |
| **Loan Officer** | Review submitted loan applications, evaluate eligibility reports, and issue primary loan approvals/rejections. |
| **President** | Final executive authorization authority for loan disbursements, benefit payouts, and system-wide structural changes. |
| **Admin** | Full system control, user provisioning, security question resets, role assignments, and global configuration access. |

---

## 🗄️ Database Architecture Schema

The MySQL database consists of **12 structured tables** (8 Core Main Tables + 4 Supporting/Governance Tables):

## 🛠️ Technology Stack

### Framework & Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

* **[Next.js](https://nextjs.org/)** (App Router) – Full-stack framework utilizing Server Actions, SSR, and API routes[cite: 1, 2].
* **[TypeScript](https://www.typescriptlang.org/)** – Strongly typed JavaScript for compile-time safety across financial calculations[cite: 1, 2].
* **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for responsive UI styling and dashboard layouts.

### Security, Validation & Utilities
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-43853D?style=for-the-badge&logo=node.js&logoColor=white)

* **[Zod](https://zod.dev/)** – TypeScript-first schema validation for runtime API request payloads and server action inputs.
* **[bcrypt](https://www.npmjs.com/package/bcrypt)** – Password hashing with a **salt factor of 10** for credential protection[cite: 1, 2].

### Database
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

* **[MySQL](https://www.mysql.com/)** – Relational database engine supporting ACID compliance, `InnoDB` storage, and relational integrity across all 12 system tables[cite: 1, 2].