import { COMMERCE_API, COMMERCE_URL } from "./components/constants2"

class CommerceService {
    async fetchProductData(url=COMMERCE_URL) {
        console.log(url)
        return new Promise(async( success, failure) => {
            try {
                const headers = {
                    "X-Authorization": COMMERCE_API,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  };
              
                  const response = await fetch(url, {
                    method: "GET",
                    headers: headers,
                  });
                  if (response.ok) {
                    const json = await response.json()
                    const pagination =json.meta.pagination;
                    const data = json.data.map((item) => ({
                        img: item.image.url,
                        title: item.name,
                        price: item.price.raw,
                        id: item.id,
                        price_formatted: item.price.formatted_with_symbol,
                        category: item.categories[0].name,
                        description: item.description,
                        inventory: item.inventory.available,
                      }));
                      success ({ response, data, pagination })
                    } else {
                        failure ({error: "Invalid http request"})
                    }
            } catch (error) {
                failure(error);

            }
        })
    }
}

export default CommerceService