import { getAdminServerEnv } from '../src/env.server'
import { TailwindDemo } from '@repo/ui/tailwind-demo'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'

export default function Home() {
  const env = getAdminServerEnv()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <TailwindDemo appName="admin" />

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

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Environment overview</CardTitle>
          <CardDescription>
            The admin app reads private server variables and public browser variables separately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-border-default bg-surface-canvas p-4">
              <p className="text-xs text-content-tertiary">APP_ENV</p>
              <p className="text-sm font-medium text-content-primary">{env.APP_ENV}</p>
            </div>
            <div className="rounded-xl border border-border-default bg-surface-canvas p-4">
              <p className="text-xs text-content-tertiary">API_BASE_URL</p>
              <p className="text-sm font-medium text-content-primary">{env.API_BASE_URL}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
