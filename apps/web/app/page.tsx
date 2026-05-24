import type { AppType } from '@repo/api'
import {
  BizCode,
  type ApiResponse,
  type PingRequest,
  type PingResponse,
} from '@repo/contracts'
import { getWebServerEnv } from '../src/env.server'
import { TailwindDemo } from '@repo/ui/tailwind-demo'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'
import { hc, type InferResponseType } from 'hono/client'

const rpcPayload: PingRequest = { name: 'web' }

export const dynamic = 'force-dynamic'

type PingRpcResponse = InferResponseType<
  ReturnType<typeof hc<AppType>>['rpc']['system']['ping']['$post']
>

async function getPingResponse(apiBaseUrl: string): Promise<PingRpcResponse> {
  const client = hc<AppType>(apiBaseUrl)

  try {
    const response = await client.rpc.system.ping.$post({
      json: rpcPayload,
    })

    return await response.json()
  } catch (error) {
    return {
      ok: false,
      error: {
        code: BizCode.SYSTEM_UPSTREAM_TIMEOUT,
        message: error instanceof Error ? error.message : 'API request failed',
      },
      meta: {
        requestId: 'unavailable',
        timestamp: new Date().toISOString(),
      },
    } satisfies ApiResponse<PingResponse>
  }
}

export default async function Home() {
  const env = getWebServerEnv()
  const pingResult = await getPingResponse(env.API_BASE_URL)
  const requestBody = JSON.stringify(rpcPayload, null, 2)
  const responseBody = JSON.stringify(pingResult, null, 2)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <TailwindDemo appName="web" />

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>shadcn/ui 验证</CardTitle>
          <CardDescription>
            在共享包 @repo/ui 中使用 Button、Card、Input、Label、Separator
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="name">用户名</Label>
            <Input id="name" placeholder="请输入用户名" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="请输入邮箱" />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1">
            取消
          </Button>
          <Button className="flex-1">提交</Button>
        </CardFooter>
      </Card>

      <section className="w-full max-w-4xl py-10">
        <Card className="overflow-hidden">
          <CardContent className="space-y-5 p-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-content-tertiary">
                RPC validation
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-content-primary">
                Shared request and response contract
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-content-tertiary">
              <span className="rounded-full border border-border-default px-3 py-1">
                POST /rpc/system/ping
              </span>
              <span className="rounded-full border border-border-default px-3 py-1">
                {pingResult.ok ? 'ok=true' : `code=${pingResult.error.code}`}
              </span>
              <span className="rounded-full border border-border-default px-3 py-1">
                server {env.APP_ENV}
              </span>
              <span className="rounded-full border border-border-default px-3 py-1">
                {env.API_BASE_URL}
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-border-default bg-surface-canvas p-4">
                <p className="text-sm font-medium text-content-primary">Request</p>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-secondary">
                  {requestBody}
                </pre>
              </div>
              <div className="rounded-2xl border border-border-default bg-surface-canvas p-4">
                <p className="text-sm font-medium text-content-primary">Response</p>
                <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-secondary">
                  {responseBody}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
