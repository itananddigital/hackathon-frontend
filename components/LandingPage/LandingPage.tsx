import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Code, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Hackathon 2025
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join the ultimate coding experience where innovation meets collaboration. Build, learn, and compete in
                  48 hours of creative problem-solving.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="h-11 px-8">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Join Hackathon?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience a weekend of innovation, networking, and fun with like-minded tech enthusiasts.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4">
              <Card className="flex flex-col items-center space-y-2 p-6">
                <CardContent className="flex flex-col items-center space-y-2 p-0">
                  <Code className="h-12 w-12 text-primary" />
                  <CardTitle className="text-xl font-bold">Code</CardTitle>
                  <p className="text-sm text-center text-muted-foreground">
                    Build innovative solutions to real-world problems
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-2 p-6">
                <CardContent className="flex flex-col items-center space-y-2 p-0">
                  <Users className="h-12 w-12 text-primary" />
                  <CardTitle className="text-xl font-bold">Connect</CardTitle>
                  <p className="text-sm text-center text-muted-foreground">
                    Network with industry professionals and fellow developers
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-2 p-6">
                <CardContent className="flex flex-col items-center space-y-2 p-0">
                  <Calendar className="h-12 w-12 text-primary" />
                  <CardTitle className="text-xl font-bold">Create</CardTitle>
                  <p className="text-sm text-center text-muted-foreground">
                    Turn your ideas into reality in just 48 hours
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-2 p-6">
                <CardContent className="flex flex-col items-center space-y-2 p-0">
                  <Trophy className="h-12 w-12 text-primary" />
                  <CardTitle className="text-xl font-bold">Compete</CardTitle>
                  <p className="text-sm text-center text-muted-foreground">
                    Win amazing prizes and recognition for your projects
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to join the hackathon?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Register now to secure your spot. Limited seats available!
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button className="h-11 px-8">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-11 px-8">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2025 Hackathon. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}