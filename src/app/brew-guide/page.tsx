import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Brew guide' }

export default function BrewGuide() {
  return (
    <section className="wrap prose">
      <h1 className="page">Brew guide</h1>
      <h3>South Indian filter</h3>
      <p>Add 3 heaped spoons of filter coffee to the top chamber, press lightly and pour in 150 ml of just-boiled water. Leave it for 15 minutes. Mix 1 part decoction with 2–3 parts hot frothy milk and sugar to taste.</p>
      <h3>Pour-over</h3>
      <p>15 g of medium-fine coffee to 250 ml of water at 93°C. Bloom with 40 ml for 30 seconds, then pour slowly in circles. Aim for about 3 minutes in total.</p>
      <h3>French press</h3>
      <p>18 g of coarse coffee to 300 ml of water just off the boil. Steep for 4 minutes, stir the crust, press slowly.</p>
    </section>
  )
}
