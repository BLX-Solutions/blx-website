import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "We could not read that enquiry." }, { status: 400 });
  }

  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ message: "Thanks — your enquiry has been received." });
  }

  const enquiry = {
    name: clean(body.name, 80),
    business: clean(body.business, 100),
    email: clean(body.email, 120),
    phone: clean(body.phone, 40),
    service: clean(body.service, 80),
    currentWebsite: clean(body.currentWebsite, 180),
    project: clean(body.project, 2000),
    consent: clean(body.consent, 20),
  };

  if (!enquiry.name || !emailPattern.test(enquiry.email) || !enquiry.service || !enquiry.project || enquiry.consent !== "accepted") {
    return NextResponse.json({ message: "Please complete every required field and check your email address." }, { status: 400 });
  }

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { message: "Automatic form delivery is not connected yet. Please use the email address shown on this page." },
      { status: 503 },
    );
  }

  console.info("BLX development enquiry validated", {
    service: enquiry.service,
    hasBusiness: Boolean(enquiry.business),
    hasPhone: Boolean(enquiry.phone),
    hasWebsite: Boolean(enquiry.currentWebsite),
  });

  return NextResponse.json({ message: "Test successful — the enquiry passed every validation check." });
}
