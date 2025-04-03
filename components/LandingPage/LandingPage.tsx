'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { backgroundVariants, cardFlip, cardStagger, headingVariants, letterVariants, staggerContainer, textFadeIn } from "@/utils/motionUtils";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Calendar, Code, Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();

  const headingText = "Welcome to Hackathon 2025".split("");

  return (
    <div className="flex min-h-screen flex-col">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 w-full h-1 bg-primary origin-left z-50"
      />
      <main className="flex-1">
        {/* Welcome Section  */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            variants={backgroundVariants}
            initial="hidden"
            animate="visible"
          />
          <div className="px-4 md:px-6 relative z-10">
            <motion.div
              className="flex flex-col items-center space-y-4 text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={textFadeIn} className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                  variants={headingVariants}
                >
                  {headingText.map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p
                  variants={textFadeIn}
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                >
                  Join the ultimate coding experience where innovation meets collaboration. Build, learn, and compete in
                  48 hours of creative problem-solving.
                </motion.p>
              </motion.div>
                <Link href="/register">
                  <Button className="h-11 px-8 relative overflow-hidden bg-primary">
                    Register Now
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
          </div>
        </section>

        {/* Why Join Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={textFadeIn} className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Join Hackathon?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience a weekend of innovation, networking, and fun with like-minded tech enthusiasts.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardStagger}
            >
              <motion.div
                variants={cardFlip}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="flex flex-col items-center space-y-2 p-6">
                  <CardContent className="flex flex-col items-center space-y-2 p-0">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Code className="h-12 w-12 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">Code</CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                      Build innovative solutions to real-world problems
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={cardFlip}
                whileHover={{ scale: 1.05, rotateY: 5}}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="flex flex-col items-center space-y-2 p-6">
                  <CardContent className="flex flex-col items-center space-y-2 p-0">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Users className="h-12 w-12 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">Connect</CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                      Network with industry professionals 
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={cardFlip}
                whileHover={{ scale: 1.05, rotateY: 5}}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="flex flex-col items-center space-y-2 p-6">
                  <CardContent className="flex flex-col items-center space-y-2 p-0">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Calendar className="h-12 w-12 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">Create</CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                      Turn your ideas into reality in just 48 hours
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                variants={cardFlip}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="flex flex-col items-center space-y-2 p-6">
                  <CardContent className="flex flex-col items-center space-y-2 p-0">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Trophy className="h-12 w-12 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">Compete</CardTitle>
                    <p className="text-sm text-center text-muted-foreground">
                      Win amazing prizes and recognition for your projects
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ready to join the hackathon? Section */}
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
                  <Button className="h-11 px-8  ">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://8848digital.com/contact-us" target="_blank">
                <Button variant="outline" size="lg" className="h-11 px-8  ">
                  Contact Us
                </Button>
                </Link>
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
          <Link href="" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}