import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient, Apps } from '@vtex/api'


export default class Contact extends ExternalClient {
  private setting: any | boolean = false
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`http://trika.vtexcommercestable.com.br`, context, {
      ...options,
    })
  }
  public async getContactDetails() {
    const contactData = await this.http.get<Promise<any>>(
      `/api/dataentities/AM/search?_fields=id,name,subject,age&_schema=`,
      await this.getHeaders()
    )

    return contactData
  }
  private async getHeaders() {
    const app = new Apps(this.context)
    this.setting = await app.getAppSettings(process.env.VTEX_APP_ID ?? '')
    console.log(this.setting)
    return {
      headers: {
        'Content-type': 'application/json',
        'X-VTEX-API-AppKey': this.setting?.apiKey,
        'X-VTEX-API-AppToken': this.setting?.appToken
      },
    }
  }
}
