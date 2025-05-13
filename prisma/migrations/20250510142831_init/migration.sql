-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "employee_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "photo_url" TEXT,
    "role" TEXT NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "department" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_id_key" ON "employees"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_key" ON "employees"("email");
