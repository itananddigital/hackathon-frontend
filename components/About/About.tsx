'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Palette, Clock, CheckCircle } from "lucide-react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeInUp, rotateIn, scaleIn, buttonHover, pulse } from "@/utils/motionUtils";

interface SectionProps {
  title: string;
  description: string;
  icon: React.ElementType;
  children?: React.ReactNode;
  scrollYProgress: MotionValue<number>;
}

const Section = ({ title, description, icon: Icon, children, scrollYProgress }: SectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });

  // Parallax effect: transform scroll progress into y movement
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Foreground moves more
  const yBackground = useTransform(scrollYProgress, [0, 1], [-20, 20]); // Background moves less

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="w-full py-12 md:py-24 relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0"
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        style={{ y: yBackground }} // Background parallax
      />
      <div className="px-4 md:px-6 relative z-10">
        <motion.div variants={scaleIn} style={{ y: yParallax }}> {/* Foreground parallax */}
          <Card className="mx-auto max-w-3xl">
            <CardHeader className="flex flex-col items-center text-center">
              <motion.div variants={rotateIn} {...pulse}>
                <Icon className="h-12 w-12 text-primary mb-4" />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <CardTitle className="text-3xl font-bold tracking-tighter md:text-4xl">
                  {title}
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="text-center">
              <motion.p
                variants={fadeInUp}
                className="text-muted-foreground md:text-xl/relaxed"
              >
                {description}
              </motion.p>
              {children && (
                <motion.div
                  variants={staggerContainer}
                  className="mt-6"
                >
                  {children}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { margin: "-50px" });
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Animated Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 w-full h-1 bg-primary origin-left z-50"
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Welcome Section */}
        <Section
          title="Welcome to Hackathon 2025"
          description="Get ready for an exciting journey of innovation and collaboration. Scroll down to see how it all works!"
          icon={ArrowRight}
          scrollYProgress={scrollYProgress}
        >
          <motion.div variants={buttonHover} whileHover="hover" whileTap="tap">
            <Link href="/themes">
              <Button className="h-11 px-8">
                Get Started
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </Section>

        {/* Join or Create Team */}
        <Section
          title="Join or Create a Team"
          description="Find your perfect teammates or start your own squad. Collaborate with others to bring your ideas to life."
          icon={Users}
          scrollYProgress={scrollYProgress}
        >
          <motion.div
            className="flex justify-center gap-4"
            variants={staggerContainer}
          >
            <motion.div variants={buttonHover} whileHover="hover" whileTap="tap">
              <Link href="/teams">
                <Button variant="outline" className="h-11 px-8">
                  Join a Team
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={buttonHover} whileHover="hover" whileTap="tap">
              <Link href="/teams">
                <Button className="h-11 px-8">
                  Create a Team
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Section>

        {/* Select Themes with Spline */}
        <Section
          title="Select Your Theme"
          description="Choose from a variety of exciting themes to kickstart your project. Get creative and solve real-world problems!"
          icon={Palette}
          scrollYProgress={scrollYProgress}
        >
        </Section>

        {/* Submit Project */}
        <Section
          title="Hackathon Begins: Submit in 48 Hours"
          description="Once the hackathon starts, you’ll have 48 hours to build and submit your project. Time to code, test, and shine!"
          icon={Clock}
          scrollYProgress={scrollYProgress}
        >
          <motion.div variants={buttonHover} whileHover="hover" whileTap="tap">
            <Link href="/submission">
              <Button className="h-11 px-8">
                Learn About Submission
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </Section>

        {/* All Set */}
        <Section
          title="All Set!"
          description="Submit your project, relax, and await the results. Great job—now it’s time to celebrate your hard work!"
          icon={CheckCircle}
          scrollYProgress={scrollYProgress}
        />
      </main>

      {/* Animated Footer */}
      <motion.footer
        ref={footerRef}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={footerVariants}
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
      >
        <motion.p
          className="text-xs text-muted-foreground"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          © 2025 8848 Digital LLP. All rights reserved.
        </motion.p>
        <motion.nav
          className="sm:ml-auto flex gap-4 sm:gap-6"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} whileHover={{ y: -2 }}>
            <Link href="https://8848digital.com" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={{ y: -2 }}>
            <Link href="https://8848digital.com" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={{ y: -2 }}>
            <Link href="https://8848digital.com/contact-us" className="text-xs hover:underline underline-offset-4">
              Contact
            </Link>
          </motion.div>
        </motion.nav>
      </motion.footer>
    </div>
  );
}