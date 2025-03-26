
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvitationEmailRequest {
  email: string;
  role: string;
  department: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, role, department }: InvitationEmailRequest = await req.json();

    const signUpUrl = `${Deno.env.get("SITE_URL")}/signup?invitation=true&email=${encodeURIComponent(email)}`;

    const emailResponse = await resend.emails.send({
      from: "Asseter <onboarding@resend.dev>",
      to: [email],
      subject: "Invitation to join Asseter",
      html: `
        <h1>You've been invited to join Asseter!</h1>
        <p>You have been invited to join Asseter with the following details:</p>
        <ul>
          <li>Role: ${role}</li>
          <li>Department: ${department}</li>
        </ul>
        <p>Click the link below to set up your account:</p>
        <a href="${signUpUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Accept Invitation</a>
        <p>This invitation link will expire in 7 days.</p>
        <p>If you did not request this invitation, please ignore this email.</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-invitation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
