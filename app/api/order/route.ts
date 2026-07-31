import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { form, items, total } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
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
        from: 'LUNAR BLOOM Orders <onboarding@resend.dev>',
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

    if (!res.ok) {
      const errorData = await res.text();
      console.error('Resend order email error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Order email error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
