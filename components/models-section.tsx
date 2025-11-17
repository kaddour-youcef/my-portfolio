"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Database, Cpu, Zap, AlertTriangle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface ModelCard {
  id: string
  name: string
  task: string
  architecture: string
  datasets: string[]
  training: {
    epochs?: number
    batchSize?: number
    learningRate?: string
    hardware: string
    duration: string
  }
  metrics: {
    [key: string]: string | number
  }
  limitations: string[]
  ethical: string[]
  license: string
  links: {
    huggingface?: string
    paper?: string
    demo?: string
  }
}

export function ModelsSection({ data }: { data: ModelCard[] }) {
  const { t } = useLanguage()

  // number of models shown
  const [visible, setVisible] = useState(4)

  const showMore = () => setVisible((prev) => prev + 4)

  return (
    <section id="models" className="py-20 border-t border-border">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-mono text-3xl font-bold text-foreground">{t("models.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("models.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {data.slice(0, visible).map((model) => (
            <Card key={model.id} className="bg-card border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground font-mono">{model.name}</CardTitle>
                    <p className="text-primary font-medium">{model.task}</p>
                    <p className="text-sm text-muted-foreground mt-1">{model.architecture}</p>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {model.license}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Training Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <Database className="mr-2 h-4 w-4 text-primary" />
                      {t("models.training.data")}
                    </h4>
                    <div className="space-y-1">
                      {model.datasets.map((dataset) => (
                        <Badge key={dataset} variant="secondary" className="text-xs mr-1 mb-1">
                          {dataset}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center">
                      <Cpu className="mr-2 h-4 w-4 text-primary" />
                      {t("models.training.setup")}
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {model.training.epochs != null && (
                        <div>{t("models.training.epochs")}: {model.training.epochs}</div>
                      )}
                      {model.training.batchSize != null && (
                        <div>{t("models.training.batch_size")}: {model.training.batchSize}</div>
                      )}
                      {model.training.learningRate != null && (
                        <div>{t("models.training.lr")}: {model.training.learningRate}</div>
                      )}
                      <div>{t("models.training.hardware")}: {model.training.hardware}</div>
                      <div>{t("models.training.duration")}: {model.training.duration}</div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="font-semibold text-foreground flex items-center mb-3">
                    <Zap className="mr-2 h-4 w-4 text-secondary" />
                    {t("models.metrics.title")}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(model.metrics).map(([metric, value]) => (
                      <div key={metric} className="bg-muted p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">{metric}</div>
                        <div className="text-lg font-mono font-semibold text-foreground">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Limitations & Ethics */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center mb-2">
                      <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                      {t("models.limitations")}
                    </h4>
                    <ul className="space-y-1">
                      {model.limitations.map((limitation, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t("models.ethical")}</h4>
                    <ul className="space-y-1">
                      {model.ethical.map((consideration, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1 h-1 bg-primary rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  {model.links.huggingface && (
                    <Button size="sm" asChild>
                      <a href={model.links.huggingface} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {t("models.links.huggingface")}
                      </a>
                    </Button>
                  )}
                  {model.links.paper && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={model.links.paper} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {t("models.links.paper")}
                      </a>
                    </Button>
                  )}
                  {model.links.demo && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={model.links.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {t("models.links.demo")}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visible < data.length && (
          <div className="flex justify-center pt-6">
            <Button onClick={showMore} variant="outline">
              {t("models.load_more") || "Load more"}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
