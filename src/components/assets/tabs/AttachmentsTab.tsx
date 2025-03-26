
import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Attachment {
  id: number;
  name: string;
  type: string;
  date: string;
}

interface AttachmentsTabProps {
  attachments: Attachment[];
}

export function AttachmentsTab({ attachments }: AttachmentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents & Attachments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center p-4 border rounded-lg"
            >
              <FileText className="h-8 w-8 mr-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{attachment.name}</p>
                <p className="text-sm text-muted-foreground">
                  {attachment.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
