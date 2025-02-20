import { Skeleton } from "@repo/ui/components/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <Skeleton className="h-9 w-[55%] rounded-md" />
        <Skeleton className="h-9 w-[15%] rounded-md" />
      </div>
      <div className="space-y-4 mt-6">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  );
}
