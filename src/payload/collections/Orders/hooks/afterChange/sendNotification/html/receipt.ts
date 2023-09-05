import { Order } from "~payload-types"
import head from "./head"

const receipt = (order: Partial<Order>) => {
  const firstName = order.contact?.billing.firstName
  const lastName = order.contact?.billing.lastName
  const date = order.createdAt ? new Date(order.createdAt) : new Date()

  const year = date.getFullYear()
  return `
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
  ${head}
  <body
  style="
    margin: 0;
    padding: 0;
    width: 100%;
    word-break: break-word;
    -webkit-font-smoothing: antialiased;
    background-color: #f2f4f6;
  "
>
  <div role="article" aria-roledescription="email" aria-label="" lang="en">
    <table
      class="email-wrapper"
      style="
        background-color: #f2f4f6;
        width: 100%;
        font-family: 'Nunito Sans', ui-sans-serif, system-ui, -apple-system,
          'Segoe UI', sans-serif;
      "
      cellpadding="0"
      cellspacing="0"
      role="none"
    >
      <tbody>
        <tr>
          <td align="center">
            <table
              class="email-content"
              style="width: 100%"
              cellpadding="0"
              cellspacing="0"
              role="none"
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    class="email-masthead"
                    style="
                      padding-top: 25px;
                      padding-bottom: 25px;
                      font-size: 16px;
                      text-align: center;
                    "
                  >
                    Order #${order.orderNumber}
                  </td>
                </tr>

                <tr>
                  <td
                    class="email-body"
                    style="width: 100%; background-color: #fff"
                  >
                    <table
                      align="center"
                      class="email-body_inner"
                      style="
                        max-width: 570px;
                        background-color: #fff;
                        margin-left: auto;
                        margin-right: auto;
                        padding-bottom: 25px;
                      "
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                    >
                      <tbody>
                        <tr>
                          <td style="padding: 45px">
                            <div style="font-size: 16px">
                              <h1
                                class="mt-0 text-2xl font-bold text-left text-gray-postmark-darker"
                                style="margin-top: 0"
                              >
                                Hi ${firstName} ${lastName},
                              </h1>
                              <p
                                class="mt-1.5 text-base leading-6 text-gray-postmark-dark"
                                style="margin-bottom: 5px"
                              >
                                Thanks for using Ronatec's website. This email
                                confirms your order has been started.
                              </p>
                              <p
                                class="mt-1.5 text-base leading-6 text-gray-postmark-dark"
                                style="margin-bottom: 5px"
                              >
                                A sales representative will get in touch with
                                you soon to complete the order.
                              </p>

                              <table
                                class="w-full"
                                style="padding-top: 35px; padding-bottom: 35px"
                                cellpadding="0"
                                cellspacing="0"
                                role="none"
                              >
                                <tbody>
                                  <tr>
                                    <td>
                                      <h3
                                        align="left"
                                        class="mt-0 text-sm text-left font-bold text-gray-postmark-darker"
                                      >
                                        Order #${order.orderNumber}
                                      </h3>
                                    </td>
                                    <td>
                                      <h3
                                        align="right"
                                        class="mt-0 text-sm text-right font-bold text-gray-postmark-darker"
                                      >
                                        ${date.toLocaleDateString()}
                                      </h3>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2">
                                      <table
                                        class="w-full"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="none"
                                        style="padding-top: 25px"
                                      >
                                        <tbody>
                                          <tr>
                                            <th
                                              align="left"
                                              class="purchase_heading pb-2"
                                            >
                                              <p
                                                class="m-0 text-xs leading-6 text-gray-postmark-meta"
                                              >
                                                Product
                                              </p>
                                            </th>
                                            <th
                                              align="right"
                                              class="purchase_heading pb-2"
                                            >
                                              <p
                                                class="m-0 text-xs leading-6 text-gray-postmark-meta"
                                              >
                                                Price
                                              </p>
                                            </th>
                                          </tr>
                                          ${order.items
                                            ?.map(
                                              (item) =>
                                                `<tr
                                            style="
                                              padding-top: 8px;
                                              padding-bottom: 8px;
                                            "
                                          >
                                            <td
                                              class="text-base leading-4.5 text-gray-postmark-dark"
                                              style="width: 80%"
                                            >
                                              ${item.title}
                                            </td>
                                            <td
                                              align="right"
                                              class="text-right"
                                              style="
                                                width: 20%;
                                                font-size: 12px;
                                              "
                                            >
                                              ${
                                                item.totals?.formatted
                                                  ?.total === "$0.00"
                                                  ? "N/A"
                                                  : item.totals?.formatted
                                                      ?.total
                                              }
                                            </td>
                                          </tr>`
                                            )
                                            .join("")}
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p
                                class="mt-1.5 text-base leading-6 text-gray-postmark-dark"
                                style="margin-bottom: 5px"
                              >
                                If you have any questions about this receipt,
                                simply reply to this email or
                                <a
                                  href="https://ronatec.us/about/contact"
                                  class="text-blue-postmark"
                                  >contact us</a
                                >
                                for help.
                              </p>
                              <p
                                class="mt-1.5 text-base leading-6 text-gray-postmark-dark"
                                style="margin-bottom: 5px"
                              >
                                Cheers,
                                <br />The Ronatec Web Team
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>
                    <table
                      align="center"
                      class="email-footer mx-auto text-center sm:w-full"
                      cellpadding="0"
                      cellspacing="0"
                      role="none"
                      style="max-width: 570px"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            class="content-cell text-base"
                            style="padding: 45px"
                          >
                            <p
                              class="mt-1.5 mb-5 text-xs leading-6 text-center text-gray-postmark-light"
                            >
                              © ${year} Ronatec. All rights reserved.
                            </p>
                            <p
                              class="mt-1.5 mb-5 text-xs leading-6 text-center text-gray-postmark-light"
                            >
                              Ronatec C2C, Inc.

                              <br />301 Mission Ave. <br />Suite 208
                              <br />Oceanside, CA 92054
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>

</html>`
}

export default receipt
