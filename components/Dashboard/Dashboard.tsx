'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Palette, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Section = ({ title, description, icon: Icon, children }: {
  title: string;
  description: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-12 md:py-24"
    >
      <div className="px-4 md:px-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader className="flex flex-col items-center text-center">
            <Icon className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold tracking-tighter md:text-4xl">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground md:text-xl/relaxed">{description}</p>
            {children && <div className="mt-6">{children}</div>}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      

      {/* Main Content */}
      <main className="flex-1">
        {/* Welcome Section */}
        <Section
          title="Welcome to Hackathon 2025"
          description="Get ready for an exciting journey of innovation and collaboration. Scroll down to see how it all works!"
          icon={ArrowRight}
        >
          <Link href="/register">
            <Button className="h-11 px-8">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Section>

        {/* Join or Create Team */}
        <Section
          title="Join or Create a Team"
          description="Find your perfect teammates or start your own squad. Collaborate with others to bring your ideas to life."
          icon={Users}
        >
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="h-11 px-8">
              Join a Team
            </Button>
            <Button className="h-11 px-8">
              Create a Team
            </Button>
          </div>
        </Section>

        {/* Select Themes */}
        <Section
          title="Select Your Theme"
          description="Choose from a variety of exciting themes to kickstart your project. Get creative and solve real-world problems!"
          icon={Palette}
        />

        {/* Submit Project */}
        <Section
          title="Hackathon Begins: Submit in 48 Hours"
          description="Once the hackathon starts, you’ll have 48 hours to build and submit your project. Time to code, test, and shine!"
          icon={Clock}
        >
          <Link href="/submission">
            <Button className="h-11 px-8">
              Learn About Submission
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Section>

        {/* All Set */}
        <Section
          title="All Set!"
          description="Submit your project, relax, and await the results. Great job—now it’s time to celebrate your hard work!"
          icon={CheckCircle}
        />
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2025 8848 Digital LLP. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="https://8848digital.com" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="https://8848digital.com" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="https://8848digital.com/contact-us" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}