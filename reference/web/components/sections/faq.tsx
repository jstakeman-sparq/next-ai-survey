import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Title } from "@/components/ui/title"
import { Question } from "@/lib/types"

export function Faq({
  eyebrow,
  title,
  description,
  questions,
}: {
  eyebrow: string
  title: string
  description: BlocksContent
  questions: Question[]
}) {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid grid-cols-12 gap-8 lg:gap-24">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex flex-col gap-6">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Title className="text-balance">{title}</Title>
              <div className="flex flex-col gap-4 text-lg">
                <BlocksRenderer content={description} />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {questions.map((question) => {
                return (
                  <AccordionItem
                    value={question.id.toString()}
                    key={question.id}
                  >
                    <AccordionTrigger className="text-xl font-bold">
                      {question.title}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-lg text-balance [&_a]:underline [&_a]:underline-offset-4 [&_ul]:list-disc [&_ul]:pl-6">
                      <BlocksRenderer content={question.content} />
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
