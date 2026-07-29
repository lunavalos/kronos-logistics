import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, message, token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "Missing token" }, { status: 400 });
    }

    // Verify token with Google ReCaptcha API
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=6LdYIGwtAAAAAKUpDnnq0QvGu07gjyoNobxl5QE2&response=${token}`,
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5) {
      // Form submission accepted
      console.log(`[Contact Form] Verified submission from ${name} (${email}): ${message}`);
      return NextResponse.json({ success: true });
    } else {
      console.warn(`[Contact Form] ReCaptcha verification failed:`, data);
      return NextResponse.json({ success: false, error: "ReCaptcha verification failed", score: data.score }, { status: 400 });
    }
  } catch (error) {
    console.error("ReCaptcha Verification Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
