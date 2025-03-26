
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CompletionRateProps {
  title: string;
  value: string;
  subtext?: string;
  percentage?: number;
  trend?: 'up' | 'down';
  link?: string;
}

export function CompletionRate({ 
  title, 
  value, 
  subtext, 
  percentage, 
  trend,
  link 
}: CompletionRateProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className={`
        border bg-white rounded-lg
        ${link ? 'cursor-pointer group relative transition-all duration-300 hover:shadow-md' : ''}`
      }
      onClick={() => link && navigate(link)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{title}</p>
            {link && <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />}
          </div>
          <div className="flex flex-wrap items-baseline gap-2 mt-1">
            <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors break-all">{value}</h2>
            {percentage !== undefined && trend && (
              <span className={`text-sm font-medium flex items-center ${
                trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 mr-1" />
                )}
                {percentage}%
              </span>
            )}
          </div>
          {subtext && (
            <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/70 transition-colors break-words mt-1">{subtext}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
