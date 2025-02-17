"use client";
import { useState } from "react";
import { Star, MessageSquareHeart } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";

const ratingLabels = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export function FeedbackModal() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [suggestion, setSuggestion] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/v1/user/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          suggestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setRating(0);
      setSuggestion("");
      setHoveredRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleStarClick = (value: number) => {
    setIsAnimating(true);
    setRating(value);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const activeRating = hoveredRating || rating;

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 transition-colors"
              >
                <MessageSquareHeart className="h-5 w-5" />
                <span className="sr-only">Open feedback form</span>
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Share your feedback</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Share Your Feedback
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Help us improve by sharing your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={cn(
                    "relative group focus:outline-none transition-transform",
                    isAnimating && rating === star && "animate-bounce"
                  )}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(star)}
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transform transition-all duration-200",
                      activeRating >= star
                        ? "fill-yellow-400 text-yellow-400 scale-110"
                        : "text-gray-300 scale-100 hover:text-gray-400",
                      "group-hover:scale-125"
                    )}
                  />
                  {hoveredRating === star && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-200">
                      <span className="text-sm font-medium bg-secondary px-2 py-1 rounded-md whitespace-nowrap">
                        {ratingLabels[star as keyof typeof ratingLabels]}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="suggestion" className="text-sm font-medium">
              Your Feedback
            </label>
            <Textarea
              id="suggestion"
              placeholder="Share your thoughts with us..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="h-32 resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            type="submit"
            className="w-full"
            disabled={!rating}
          >
            Send Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
