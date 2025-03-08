import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';

export function Brand() {
  return (
    <div className="min-h-screen bg-background p-8 flex items-center justify-center">
      <Card className="w-[600px] overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-yellow-400 rounded-xl rotate-12"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-16 w-16 relative text-background transform -rotate-12"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div>
              <CardTitle className="text-4xl font-black tracking-tight">
                <span>JS</span>
                <span className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-transparent bg-clip-text">Blitz</span>
              </CardTitle>
              <CardDescription className="text-lg">Modern JavaScript Playground</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <h3 className="font-semibold">About</h3>
            <p className="text-muted-foreground">
              JSBlitz is a modern, interactive JavaScript playground designed for learning and experimentation. 
              It provides a seamless environment for writing, testing, and sharing JavaScript code with real-time 
              preview and console output.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Key Features</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Real-time code preview with instant feedback</li>
              <li>Interactive console with full JavaScript runtime</li>
              <li>Built-in tutorial system with practical examples</li>
              <li>File system support with multiple file types</li>
              <li>Dark mode support for comfortable coding</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'Vite'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}