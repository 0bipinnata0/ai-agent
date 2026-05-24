import { TailwindDemo } from '@repo/ui/tailwind-demo'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'

export default function Home() {
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
    </div>
  )
}
