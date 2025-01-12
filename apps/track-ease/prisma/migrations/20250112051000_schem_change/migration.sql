-- DropForeignKey
ALTER TABLE "Epic" DROP CONSTRAINT "Epic_projectId_fkey";

-- DropForeignKey
ALTER TABLE "EpicDraft" DROP CONSTRAINT "EpicDraft_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Initiation" DROP CONSTRAINT "Initiation_projectId_fkey";

-- DropForeignKey
ALTER TABLE "InitiationDraft" DROP CONSTRAINT "InitiationDraft_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectOnUsers" DROP CONSTRAINT "ProjectOnUsers_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Release" DROP CONSTRAINT "Release_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDraft" DROP CONSTRAINT "ReleaseDraft_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiation" ADD CONSTRAINT "Initiation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiationDraft" ADD CONSTRAINT "InitiationDraft_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReleaseDraft" ADD CONSTRAINT "ReleaseDraft_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Release" ADD CONSTRAINT "Release_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Epic" ADD CONSTRAINT "Epic_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EpicDraft" ADD CONSTRAINT "EpicDraft_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectOnUsers" ADD CONSTRAINT "ProjectOnUsers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
