"use client"

import Script from "next/script"

export function TrackingScript() {
  return (
    <>
      {/* MCFX Script */}
      <Script
        id="mcfx-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (w,d,o,u,a,m) {
                w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments);
                },w[o].e=1*new Date();w[o].u=u;a=d.createElement('script'),
                m=d.getElementsByTagName('script')[0];a.async=1;
                a.src=u+'/mcfx.js';m.parentNode.insertBefore(a, m);
              })(window, document, 'mcfx', 'https://tsparq.teamsparq.com');
            mcfx('create', 44632);
          `,
        }}
      />

      {/* Lead Manager Script */}
      <Script
        id="lead-manager-script"
        src="//cdn.leadmanagerfx.com/phone/js/44632"
        strategy="afterInteractive"
        async
      />
    </>
  )
}
