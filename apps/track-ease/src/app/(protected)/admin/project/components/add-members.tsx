import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import MultipleUsersSelector from "./user-select";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/app/actions";
import { Option } from "@repo/ui/components/multiple-selector";

export function AddMembers({ selectedMembers, selectedOwners }: any) {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      getUsers().then((data) => {
        return data?.map((user) => ({
          ...user,
          label: user.email as string,
          value: user.id as string,
          name: user.name as string,
          email: user.email as string,
        }));
      }),
  });

  const [memberSelections, setMemberSelections] = useState<Option[]>([]);
  const [ownerSelections, setOwnerSelections] = useState<Option[]>([]);

  const handleMembersSelect = (selection: Option[]) => {
    console.log(selection);
    setMemberSelections(selection);
    selectedMembers(selection);
  };

  const handleOwnersSelect = (selection: Option[]) => {
    console.log(selection);
    setOwnerSelections(selection);
    selectedOwners(selection);
  };

  // Filter options for members and owners
  const filteredMemberOptions =
    data?.filter(
      (option: Option) =>
        !ownerSelections.some((owner) => owner.value === option.value)
    ) ?? [];

  const filteredOwnerOptions =
    data?.filter(
      (option: Option) =>
        !memberSelections.some((member) => member.value === option.value)
    ) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add members</CardTitle>
        <CardDescription>
          Anyone with this permission can access this project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          {isPending ? (
            <div className="flex-1">Please wait...</div>
          ) : (
            <MultipleUsersSelector
              options={filteredMemberOptions}
              onChange={handleMembersSelect}
              placeholder="Select team members..."
            />
          )}
        </div>
        <Separator className="my-4" />
        {isPending ? (
          <div className="flex-1">Please wait...</div>
        ) : (
          <MultipleUsersSelector
            options={filteredOwnerOptions}
            onChange={handleOwnersSelect}
            placeholder="Select team owners..."
          />
        )}
      </CardContent>
    </Card>
  );
}
