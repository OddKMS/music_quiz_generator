import { authenticate } from '#lib/Auth';

async function onBeforeRender(pageContext: any) {
  // const auth = await authenticate();
  // const pageProps = { auth };
  // return {
  //   pageContext: {
  //     pageProps,
  //   },
  // };
}

export { onBeforeRender };
