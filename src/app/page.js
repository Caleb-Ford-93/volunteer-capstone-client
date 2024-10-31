'use client'

import { Button } from "@nextui-org/react"

export default function LandingPage() {
    return (
        <div className="flex items-center justify-center">
            <div className="text-center mt-8 max-w-lg p-6 bg-white shadow-lg rounded-lg dark:bg-gray-950">
                <h1 className="text-5xl font-bold">Vol-Connect</h1>
                <p className="text-lg mb-8">
                    Bridging the gap between volunteers and organizations. Join us to make a difference in your community!
                </p>
                <Button 
                    auto 
                    color="primary" 
                    size="lg" 
                    as="a" 
                    href="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                    Get Started
                </Button>
            </div>
        </div>
    )
}
