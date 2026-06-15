import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cheatsheet } from "@/lib/content/cheatsheet";

export default function CheatsheetPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">CLF-C02 Cheatsheet</h1>
        <p className="text-muted-foreground">
          A condensed, exam-day reference covering every domain. Jump to a
          topic or scroll through the full sheet.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-wrap gap-2 pt-6">
          {cheatsheet.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="rounded-full border px-3 py-1 text-sm transition-colors hover:bg-muted"
            >
              {section.title}
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6">
        {cheatsheet.map((section) => (
          <Card key={section.id} id={section.id} className="scroll-mt-20">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <article className="prose prose-sm prose-neutral max-w-none dark:prose-invert prose-table:text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.content}
                </ReactMarkdown>
              </article>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
