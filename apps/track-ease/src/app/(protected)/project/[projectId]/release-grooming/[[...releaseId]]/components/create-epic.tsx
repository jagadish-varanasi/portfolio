"use client";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import React, { useContext, useEffect, useState } from "react";

import { Checkbox } from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/label";
import { EditorContext } from "@/context/EditorContext";
import { Badge } from "@repo/ui/components/badge";
import Link from "next/link";

interface HighLevelRequirement {
  id: string;
  requirement: string;
  priority: number;
  initiationId: string | null;
  epicId: string | null;
  epicDraftId: string | null;
  mapped: boolean;
}

function CreateEpic({
  highLevelRequirements,
  projectId,
  data,
  type,
}: {
  highLevelRequirements?: HighLevelRequirement[];
  projectId: string;
  data: any;
  type: string;
}) {
  const { details, handleDetails, setDetails, putDocument } =
    useContext(EditorContext);

  const handleChecked = (checked: boolean | string, hlr: any) => {
    const mapHighLevel = details.hlMap;
    console.log(mapHighLevel, hlr);
    if (!checked) {
      delete mapHighLevel[hlr.id];
      handleDetails("hlMap", mapHighLevel);
    } else {
      handleDetails("hlMap", { ...mapHighLevel, [hlr.id]: hlr });
    }
  };

  console.log(details, data, highLevelRequirements);

  useEffect(() => {
    if (!data) return;
    const hlMap = data?.highLevelRequirements.reduce((acc: any, cv: any) => {
      acc[cv.id] = cv;
      return acc;
    }, {});
    console.log(hlMap);
    setDetails({
      title: data?.title,
      description: data?.description,
      hlMap,
      id: data?.id,
    });
    if (data?.document) putDocument(JSON.parse(data?.document));
  }, [data, setDetails, putDocument]);

  console.log(details);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
          <div className="rounded-md border bg-muted">
            <div className="p-8">
              <div className="text-lg font-bold">High level requirements</div>
              <div className="grid gap-6 mt-6">
                {highLevelRequirements?.map((hlr: HighLevelRequirement) => (
                  <div key={hlr.id} className="flex gap-2 items-center">
                    <Checkbox
                      disabled={
                        ((Boolean(hlr?.epicId) || Boolean(hlr?.epicDraftId)) &&
                          type !== "edit") ||
                        false
                      }
                      checked={Boolean(details.hlMap[hlr.id]) || false}
                      onCheckedChange={(checked) => handleChecked(checked, hlr)}
                    ></Checkbox>
                    <div className="text-xs">{`#${hlr.priority} ${hlr.requirement}`}</div>
                    <div>
                      {hlr?.epicId && (
                        <Link
                          href={`/project/${projectId}/epics?open=${hlr?.epicId}`}
                        >
                          <Badge>epic</Badge>
                        </Link>
                      )}
                    </div>
                    <div>
                      {hlr?.epicDraftId && (
                        <Link
                          href={`/project/${projectId}/release-grooming/${hlr?.epicDraftId}?type=edit`}
                        >
                          <Badge variant="outline">epic draft</Badge>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] border border-input rounded-md">
            <div className="flex h-full flex-col space-y-4 p-4">
              <div className="text-md font-semibold mb-4">Create Epic</div>
              <div className="grid gap-3">
                <Label>Map High level requirement</Label>
                {Object.keys(details.hlMap).length === 0 && (
                  <div className="text-sm">Check mark the requirements...</div>
                )}
                {highLevelRequirements?.map(
                  (req: any) =>
                    details.hlMap[req.id] && (
                      <div
                        key={req.id}
                        className="text-sm border border-gray-300 py-1 px-2 rounded-md"
                      >
                        {req.requirement}
                      </div>
                    )
                )}
                <Input
                  value={details?.title}
                  placeholder="Enter name of epic"
                  onChange={(e) => {
                    handleDetails("title", e.target.value);
                  }}
                ></Input>
                <Textarea
                  value={details?.description}
                  placeholder="Enter description of epic"
                  rows={4}
                  onChange={(e) => {
                    handleDetails("description", e.target.value);
                  }}
                ></Textarea>
                <Input placeholder="Enter story point" type="number"></Input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateEpic;
