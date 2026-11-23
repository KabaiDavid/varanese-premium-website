import { useState } from 'react';
import { PageHero } from '../components/PageHero';
import { Img } from '../components/Img';
import { Arrow, Ext } from '../components/Icons';
import { business } from '../data/business';
import './gift.css';

// PayPal hosted button — identical to the one on varanese.com.
const AMOUNTS = [5, 10, 25, 50, 75, 100, 150, 200, 500];

export default function GiftCards() {
  const [amount, setAmount] = useState(100);
  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title="Give the gift of *great dining.*"
        sub={<p>Give the gift of good food and great friends any time of the year with a Varanese Gift Certificate.</p>}
      />
      <section className="section gift" aria-labelledby="gift-h">
        <div className="wrap gift__grid">
          <div className="gift__visual" aria-hidden="true">
            <div className="cert" data-reveal="up">
              <div className="cert__inner">
                <span className="eyebrow cert__label">Gift certificate</span>
                <Img name="logo-white" alt="" sizes="220px" className="cert__logo" />
                <span className="cert__amt num" key={amount}>${amount}</span>
                <span className="cert__foot">2106 Frankfort Ave · Louisville, Kentucky</span>
              </div>
            </div>
          </div>
          <div>
            <h2 id="gift-h" className="h2">Choose an amount.</h2>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="gift__form">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="UPQACL92LVTNL" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="hidden" name="on0" value="Choose the Amount of Your Gift Certificate" />
              <fieldset>
                <legend className="sr-only">Gift certificate amount</legend>
                <div className="amounts">
                  {AMOUNTS.map((a) => (
                    <label key={a} className={`amount ${a === amount ? 'is-on' : ''}`}>
                      <input type="radio" name="os0" value={`$${a} Gift Certificate`} checked={a === amount} onChange={() => setAmount(a)} />
                      <span className="num">${a}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" className="btn btn--burgundy gift__buy">
                Buy ${amount} gift certificate <Ext />
                <span className="sr-only">(opens PayPal in a new tab)</span>
              </button>
              <p className="muted gift__secure">Secure checkout with your credit card or PayPal account.</p>
            </form>
            <ol className="steps">
              {['Select the amount you would like to give.', 'Click the Buy Gift Certificate button.', 'Pay with your credit card or PayPal account.', 'We will mail the gift certificate to your home address.'].map((s, n) => (
                <li key={s}><span className="num eyebrow brass">0{n + 1}</span><span>{s}</span></li>
              ))}
            </ol>
            <p className="muted">Questions? Contact us at <a className="text-link" href={business.emailHref}>{business.email}</a> or call <a className="text-link" href={business.phoneHref}>{business.phone}</a>.</p>
          </div>
        </div>
      </section>
      <section className="gift-band dark-2">
        <div className="wrap gift-band__grid">
          <figure className="gift-band__fig"><Img name="private-dining-soren" alt="A table set in the Varanese dining room" sizes="(min-width: 1024px) 40vw, 92vw" cover /></figure>
          <div>
            <p className="eyebrow brass">For every occasion</p>
            <p className="h2" style={{ marginTop: '1rem' }}>An evening on Frankfort Avenue, <em>wrapped.</em></p>
            <a href="/menu/" className="link" style={{ marginTop: '1.5rem' }}>Browse the menu <Arrow /></a>
          </div>
        </div>
      </section>
    </>
  );
}
