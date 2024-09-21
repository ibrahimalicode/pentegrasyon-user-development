const orders = [
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 2,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 1,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 0,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 3,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 5,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 1,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 1,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 3,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 0,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 1,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 2,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 5,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 4,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 1,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 2,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: 3,
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: "0",
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: "0",
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: "0",
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
  {
    id: "66ec57104813c9957fefae33",
    status: 400, // ORDER STAT ENUM
    isScheduled: false,
    confirmationId: "g962",
    client: {
      id: "619cb87020a5f93280f47b30",
      name: "Berat A.",
      contactPhoneNumber: "+90 (850) 215-1500",
      clientPhoneNumber: "+90 (850) 346-9382 / 543294",
      clientUnmaskedPhoneNumber: "+90 (507) 678-8918",
      deliveryAddress: {
        id: "667a17e9bf3c5904b007ec89",
        address: "Arnavutköy Merkez Mah. - Arnavutköy Merkez Mah.",
        aptNo: "Falan Sit F Blok",
        floor: "8",
        doorNo: "15",
        city: "İstanbul",
        district: "Arnavutköy",
        description: "Boşver tarifi",
      },
      location: {
        lat: 41.1759836,
        lon: 28.7372922,
      },
    },
    courier: {
      status: 1000, //COURIER STAT ENUM
      name: "Restoran Kuryesi",
      location: {
        lat: 40.740522,
        lon: 28.623905,
      },
    },
    products: [
      {
        id: "66ec566aff4cd925899321bb",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "617fe6c10e75502e2a463161",
        name: {
          tr: "Sarma",
          en: "Sarma",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 60,
        totalOptionPrice: 0,
        totalPriceWithOption: 60,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Sarma",
            en: "Sarma",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "Test",
      },
      {
        id: "66ec566eff4cd925899321bf",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "61829774baddfd4f984be9da",
        name: {
          tr: "Cips",
          en: "Cips",
        },
        price: 12,
        optionPrice: 0,
        priceWithOption: 12,
        totalPrice: 12,
        totalOptionPrice: 0,
        totalPriceWithOption: 12,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Cips",
            en: "Cips",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
      {
        id: "66ec5679ff4cd925899321c4",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "6086d12d09253a59807547bc",
        name: {
          tr: "Mercimek Çorbası",
          en: "Mercimek Çorbası",
        },
        price: 5,
        optionPrice: 0,
        priceWithOption: 5,
        totalPrice: 10,
        totalOptionPrice: 0,
        totalPriceWithOption: 10,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Mercimek Çorbası",
            en: "Mercimek Çorbası",
          },
          options: {
            tr: [],
            en: [],
          },
        },
        note: "baharatlı olsun",
      },
      {
        id: "66ec568bff4cd925899321ca",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d19e09253adaa17547be",
        name: {
          tr: "Peynirli Börek (6 Adet)",
          en: "Peynirli Börek (6 Adet)",
        },
        price: 20,
        optionPrice: 0,
        priceWithOption: 20,
        totalPrice: 20,
        totalOptionPrice: 0,
        totalPriceWithOption: 20,
        optionCategories: [
          {
            optionCategory: "6086d19e09253ade4e7547bf",
            name: {
              tr: "Ekstra",
              en: "Ekstra",
            },
            options: [
              {
                option: "6086d19e09253a33897547c0",
                name: {
                  tr: "Fıstık",
                  en: "Fıstık",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Peynirli Börek (6 Adet)",
            en: "Peynirli Börek (6 Adet)",
          },
          options: {
            tr: ["Ekstra: Fıstık"],
            en: ["Ekstra: Fıstık"],
          },
        },
        note: "bol fıstıklı ",
      },
      {
        id: "66ec5691ff4cd925899321d1",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086ce3009253a92c37547a2",
        name: {
          tr: "Adana",
          en: "Adana",
        },
        price: 20,
        optionPrice: 7,
        priceWithOption: 27,
        totalPrice: 20,
        totalOptionPrice: 7,
        totalPriceWithOption: 27,
        optionCategories: [
          {
            optionCategory: "6086ce3009253a576d7547a3",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086ce3009253ae62a7547a5",
                name: {
                  tr: "Somuna",
                  en: "Somuna",
                },
                price: 7,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Adana",
            en: "Adana",
          },
          options: {
            tr: ["Ekmek Seçimi: Somuna"],
            en: ["Ekmek Seçimi: Somuna"],
          },
        },
      },
      {
        id: "66ec56a2ff4cd925899321d9",
        imageURL: "",
        wideImageURL: "",
        count: 5,
        product: "6086d0c009253a570d7547aa",
        name: {
          tr: "Urfa Kebap",
          en: "Urfa Kebap",
        },
        price: 30,
        optionPrice: 10,
        priceWithOption: 40,
        totalPrice: 150,
        totalOptionPrice: 50,
        totalPriceWithOption: 200,
        optionCategories: [
          {
            optionCategory: "6086d0c009253a86da7547ab",
            name: {
              tr: "Ekmek Seçimi",
              en: "Ekmek Seçimi",
            },
            options: [
              {
                option: "6086d0c009253a108e7547ac",
                name: {
                  tr: "Pideye",
                  en: "Pideye",
                },
                price: 10,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Urfa Kebap",
            en: "Urfa Kebap",
          },
          options: {
            tr: ["Ekmek Seçimi: Pideye"],
            en: ["Ekmek Seçimi: Pideye"],
          },
        },
      },
      {
        id: "66ec56aaff4cd925899321e2",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6086d0f809253a13827547b2",
        name: {
          tr: "Pirzola",
          en: "Pirzola",
        },
        price: 50,
        optionPrice: 0,
        priceWithOption: 50,
        totalPrice: 50,
        totalOptionPrice: 0,
        totalPriceWithOption: 50,
        optionCategories: [
          {
            optionCategory: "6086d0f809253a40747547b3",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6086d0f809253ac24b7547b5",
                name: {
                  tr: "Normal",
                  en: "Normal",
                },
                price: 0,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pirzola",
            en: "Pirzola",
          },
          options: {
            tr: ["Baharat Seçimi: Normal"],
            en: ["Baharat Seçimi: Normal"],
          },
        },
      },
      {
        id: "66ec56b2ff4cd925899321ec",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087df3a09253ab98d7547c8",
        name: {
          tr: "Pide",
          en: "Pide",
        },
        price: 10,
        optionPrice: 6,
        priceWithOption: 16,
        totalPrice: 10,
        totalOptionPrice: 6,
        totalPriceWithOption: 16,
        optionCategories: [
          {
            optionCategory: "6087df3a09253a662d7547c9",
            name: {
              tr: "Baharat Seçimi",
              en: "Baharat Seçimi",
            },
            options: [
              {
                option: "6087df3a09253afeb47547cc",
                name: {
                  tr: "Yumurtalı",
                  en: "Yumurtalı",
                },
                price: 3,
              },
              {
                option: "6087df3a09253a15817547cb",
                name: {
                  tr: "Küncülü",
                  en: "Küncülü",
                },
                price: 2,
              },
              {
                option: "6087df3a09253a64a77547ca",
                name: {
                  tr: "Acılı",
                  en: "Acılı",
                },
                price: 1,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Pide",
            en: "Pide",
          },
          options: {
            tr: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
            en: ["Baharat Seçimi: Yumurtalı, Küncülü, Acılı"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56b7ff4cd925899321f7",
        imageURL: "",
        wideImageURL: "",
        count: 1,
        product: "6087dfb109253a97a47547d2",
        name: {
          tr: "Lahmacun",
          en: "Lahmacun",
        },
        price: 5,
        optionPrice: 5,
        priceWithOption: 10,
        totalPrice: 5,
        totalOptionPrice: 5,
        totalPriceWithOption: 10,
        optionCategories: [
          {
            optionCategory: "6087dfb109253a734a7547d3",
            name: {
              tr: "Garnitür",
              en: "Garnitür",
            },
            options: [
              {
                option: "6087dfb109253a2ba77547d4",
                name: {
                  tr: "Garnitür Ekle",
                  en: "Garnitür Ekle",
                },
                price: 5,
              },
            ],
          },
        ],
        displayInfo: {
          title: {
            tr: "Lahmacun",
            en: "Lahmacun",
          },
          options: {
            tr: ["Garnitür: Garnitür Ekle"],
            en: ["Garnitür: Garnitür Ekle"],
          },
        },
        note: "test",
      },
      {
        id: "66ec56bcff4cd92589932203",
        imageURL: "",
        wideImageURL: "",
        count: 2,
        product: "60ec4fb69e917317bf6e5eeb",
        name: {
          tr: "Poşet",
          en: "Plastic Bag",
        },
        price: 0.25,
        optionPrice: 0,
        priceWithOption: 0.25,
        totalPrice: 0.5,
        totalOptionPrice: 0,
        totalPriceWithOption: 0.5,
        optionCategories: [],
        displayInfo: {
          title: {
            tr: "Poşet",
            en: "Plastic Bag",
          },
          options: {
            tr: [],
            en: [],
          },
        },
      },
    ],
    clientNote: "Test sipariş notu",
    doNotKnock: true,
    dropOffAtDoor: false,
    totalPrice: 405.5,
    checkoutDate: "2024-09-19T16:53:36.658Z",
    deliveryType: 2,
    isEcoFriendly: true,
    paymentMethod: 3,
    marketplaceId: "0",
    paymentMethodText: {
      en: "On Delivery Credit Card Payment",
      tr: "Kapıda Kredi & Banka Kartı ile Ödeme",
    },
    restaurant: {
      id: "6086c78409253a22a4754780",
      name: "Liwasoft POS",
      brand: {
        id: "6076a50a3bbd3061b210e960",
        name: "test deneme ahmet2",
      },
    },
    isQueued: false,
  },
];

export default orders;
