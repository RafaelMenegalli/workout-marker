import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-03-31.basil',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed')
    }

    try {
        if (!process.env.STRIPE_PRICE_ID) {
            throw new Error("STRIPE_PRICE_ID não está definido")
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card', 'pix'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancelado`,
        })

        return res.status(200).json({ url: session.url })
    } catch (err) {
        if (err instanceof Error) {
            console.error("Erro ao criar sessão:", err)
            return res.status(500).json({ error: err.message })
        } else {
            console.error("Erro desconhecido: ", err)
            return res.status(500).json({ error: "Erro interno do servidor" })
        }
    }
}
