import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { form, items, total } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'RESEND_API_KEY is missing on the server' }, { status: 500 });
    }

    const itemRows = items
      .map(
        (item: { name: string; quantity: number; price: number }) =>
          `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;">${item.name}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;">x${item.quantity}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;">Rs ${(item.price * item.quantity).toLocaleString('en-PK')}</td></tr>`
      )
      .join('');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LUNAR BLOOM Orders <orders@lunarbloomofficial.com>',
        to: ['support.lunarbloom.pk@gmail.com'],
        reply_to: form.email,
        subject: `New Order — ${form.firstName} ${form.lastName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 500px;">
            <h2>New LUNAR BLOOM Order</h2>
            <p><strong>Customer:</strong> ${form.firstName} ${form.lastName}</p>
            <p><strong>Phone:</strong> ${form.phone}</p>
            <p><strong>Email:</strong> ${form.email}</p>
            <p><strong>Address:</strong> ${form.address}, ${form.city}, ${form.zip}, ${form.country}</p>
            <table style="border-collapse:collapse;width:100%;margin-top:12px;">
              ${itemRows}
            </table>
            <p style="margin-top:12px;"><strong>Total: Rs ${Number(total).toLocaleString('en-PK')}</strong></p>
            <p>Payment: Cash on Delivery</p>
          </div>
        `,
      }),
    });

    const resendBody = await res.text();

    if (!res.ok) {
      // Temporary: surface the exact Resend error in the response itself so
      // it shows up directly in the browser's Network tab, no Vercel log
      // hunting needed.
      return NextResponse.json({ error: 'Resend rejected the request', resendStatus: res.status, resendBody }, { status: 500 });
    }

    return NextResponse.json({ success: true, resendBody });
  } catch (error) {
    return NextResponse.json({ error: 'Exception thrown', details: String(error) }, { status: 500 });
  }
}



