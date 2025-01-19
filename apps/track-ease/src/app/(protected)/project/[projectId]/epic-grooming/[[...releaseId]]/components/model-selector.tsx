"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@repo/ui/lib/utils";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/ui/components/hover-card";
import { Label } from "@repo/ui/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";

import { Model, ModelType } from "../data/models";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { EditorContext } from "@/context/EditorContext";

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[];
}

export function ModelSelector({ models, types, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0]);

  const { editor } = React.useContext(EditorContext);

  if (!editor) return <div>Please wait</div>;

  const executeAction = (model: Model) => {
    console.log(model);
    switch (model.name) {
      case "Insert table":
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run();
        break;
      case "Add column before":
        editor.chain().focus().addColumnBefore().run();
        break;
      case "Add column after":
        editor.chain().focus().addColumnAfter().run();
        break;
      case "Delete column":
        editor.chain().focus().deleteColumn().run();
        break;
      case "Add row before":
        editor.chain().focus().addRowBefore().run();
        break;
      case "Add row after":
        editor.chain().focus().addRowAfter().run();
        break;
      case "Delete row":
        editor.chain().focus().deleteRow().run();
        break;
      case "Delete table":
        editor.chain().focus().deleteTable().run();
        break;
      case "Merge cells":
        editor.chain().focus().mergeCells().run();
        break;
      case "Split cell":
        editor.chain().focus().splitCell().run();
        break;
      case "Toggle header column":
        editor.chain().focus().toggleHeaderColumn().run();
        break;
      case "Toggle header row":
        editor.chain().focus().toggleHeaderRow().run();
        break;
      case "Toggle header cell":
        editor.chain().focus().toggleHeaderCell().run();
        break;
      case "Merge or split":
        editor.chain().focus().mergeOrSplit().run();
        break;
      case "Set cell attribute":
        editor.chain().focus().setCellAttribute("colspan", 2).run();
        break;
      case "Fix tables":
        editor.chain().focus().fixTables().run();
        break;
      case "Go to next cell":
        editor.chain().focus().goToNextCell().run();
        break;
      case "Go to previous cell":
        editor.chain().focus().goToPreviousCell().run();
        break;
      default:
        console.log("Command not recognized");
    }
  };

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Table Actions</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The model which will generate the completion. Some models are suitable
          for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[280px]"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel.description}
                </div>
                {peekedModel.strengths ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="text-sm font-medium leading-none">
                      Strengths
                    </h5>
                    <ul className="text-sm text-muted-foreground">
                      {peekedModel.strengths}
                    </ul>
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[680px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((model) => (
                        <ModelItem
                          key={model.id}
                          model={model}
                          isSelected={selectedModel?.id === model.id}
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            executeAction(model);
                            setSelectedModel(model);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface ModelItemProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
  onPeek: (model: Model) => void;
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model);
        }
      }
    }
  });

  return (
    <CommandItem
      key={model.id}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  );
}
