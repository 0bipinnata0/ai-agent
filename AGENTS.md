# 项目规则

## 共享包导入约定

`@repo/ui` 不使用 `".": "./src/index.tsx"` 根路径聚合导出。所有组件通过子路径直接导入：

```tsx
// ✅ 正确
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'

// ❌ 禁止
import { Button, Card } from '@repo/ui'
```

## 依赖版本管理

所有 workspace 公共依赖统一收进 `pnpm-workspace.yaml` 的 `catalog` 中管理，禁止在各 `package.json` 中写死版本号。

```yaml
# pnpm-workspace.yaml
catalog:
  clsx: ^2.1.1
  tailwind-merge: ^3.6.0
```

```json
// package.json
"dependencies": {
  "clsx": "catalog:"
}
```

新增依赖时，先写入 `pnpm-workspace.yaml` 的 `catalog`，再在子包中用 `catalog:` 引用。

## 设计系统使用约束

颜色约束

- 页面代码不直接写 `#xxxxxx` 或 `rgba(...)`，先补 token
- 文本颜色优先使用 `content-*`
- 背景颜色优先使用 `surface-*`
- 风险、成功、警告等反馈统一使用 `state-*`

组件约束

- 主按钮、次按钮、风险按钮都从 `Button` 变体中选
- 表单容器优先用 `Card` 组合，不重新手写面板结构
- 标签和状态优先用 `Badge`，不临时拼一段颜色 class
- 表单标签和输入框配对使用 `Label + Input`

扩展约束

- 新增颜色、圆角、阴影，先更新 `theme.css`
- 新增组件变体，优先扩展共享组件
- 页面局部特殊样式要有明确原因，避免把例外写成常态
