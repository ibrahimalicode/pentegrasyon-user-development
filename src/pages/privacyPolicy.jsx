//MODULES
import { Link } from "react-router-dom";

// The legal text below is unchanged — this file only restyles it. The old
// version used class names that don't exist (text-primary-1, bg-light-1,
// text-black-1 — the tokens are CSS variables, so the Tailwind form is
// text-[--primary-1]), which meant every heading silently rendered unstyled,
// in Times New Roman, inside an invisible card.

const SiteLink = () => (
  <a
    href="https://www.pentegrasyon.net"
    className="text-[--link-1] hover:underline"
  >
    www.pentegrasyon.net
  </a>
);

const H2 = ({ number, children }) => (
  <h2 className="mt-8 mb-2 text-base font-semibold text-[--black-1]">
    {number && <span className="text-[--primary-1]">{number}. </span>}
    {children}
  </h2>
);

const P = ({ children }) => (
  <p className="mb-4 text-sm leading-relaxed">{children}</p>
);

const COOKIE_TABLE = [
  {
    provider: "Google",
    name: "_gat",
    purpose:
      "Analytics cihaz bilgisi - Google Tag Manager sisteminde yer alan uygulamaların kullanması için",
    type: "Persistent Cookie",
    duration: "2 Yıl",
  },
  {
    provider: "Liwa Yazılım",
    name: "ASP.NET_SessionId",
    purpose: "Kullanıcıya ait session ID değerinin saklandığı cookiedir.",
    type: "Persistent Cookie",
    duration: "30 Dakika",
  },
];

const BROWSER_STEPS = [
  [
    "Google Chrome",
    "Tarayıcınızın adres bölümünde yer alan, \"kilit işareti\"ni tıklayarak, \"Çerezler\" sekmesinden çerezlere izin verebilir veya engelleyebilirsiniz.",
  ],
  [
    "Internet Explorer",
    "Tarayıcınızın sağ üst bölümünde yer alan \"Araçlar\" bölümünden güvenlik sekmesini tıklayarak \"izin ver\" veya \"izin verme\" şeklinde çerezleri yönetebilirsiniz.",
  ],
  [
    "Mozilla Firefox",
    "Tarayıcınızın sağ üst köşesinde yer alan \"menüyü aç\" sekmesini tıklayınız. \"Seçenekler\" görselini tıklayarak \"Gizlilik ve Güvenlik\" butonunu kullanarak çerezleri yönetebilirsiniz.",
  ],
  [
    "Opera",
    "Tarayıcınızın \"Tercihler\" bölümünde \"Gelişmiş\"i seçerek \"Çerezler\" bölümünden çerez yönetimini yapabilirsiniz.",
  ],
  [
    "Safari",
    "Telefonunuzun \"Ayarlar\" bölümünden \"safari\" sekmesini seçip, \"Gizlilik ve Güvenlik\" Bölümünden tüm çerez yönetiminizi yapabilirsiniz.",
  ],
];

const USAGE_PURPOSES = [
  "Web sitesi/mobil uygulamalar üzerinden alışveriş yapanın/yaptıranın kimlik bilgilerini teyit etmek,",
  "İletişim için adres ve diğer gerekli bilgileri kaydetmek,",
  "Mesafeli satış sözleşmesi ve Tüketicinin Korunması Hakkında Kanun'un ilgili maddeleri tahtında akdettiğimiz sözleşmelerin koşulları, güncel durumu ve güncellemeler ile ilgili müşterilerimiz ile iletişime geçmek, gerekli bilgilendirmeleri yapabilmek,",
  "Elektronik (internet/mobil vs.) veya kâğıt ortamında işleme dayanak olacak tüm kayıt ve belgeleri düzenlemek,",
  "Mesafeli satış sözleşmesi ve Tüketicinin Korunması Hakkında Kanun'un ilgili maddeleri tahtında akdettiğimiz sözleşmeler uyarınca üstlenilen yükümlülükleri ifa etmek,",
  "Kamu güvenliğine ilişkin hususlarda talep halinde ve mevzuat gereği kamu görevlilerine bilgi verebilmek,",
  "Müşterilerimize daha iyi bir alışveriş deneyimini sağlamak, \"müşterilerimizin ilgi alanlarını dikkate alarak\" müşterilerimizin ilgilenebileceği ürünlerimiz hakkında müşterilerimize bilgi verebilmek, kampanyaları aktarmak,",
  "Müşteri memnuniyetini artırmak, web sitesi ve/veya mobil uygulamalardan alışveriş yapan müşterilerimizi tanıyabilmek ve müşteri çevresi analizinde kullanabilmek, çeşitli pazarlama ve reklam faaliyetlerinde kullanabilmek ve bu kapsamda anlaşmalı kuruluşlar aracılığıyla elektronik ortamda ve/veya fiziki ortamda anketler düzenlemek,",
  "Anlaşmalı kurumlarımız ve çözüm ortaklarımız tarafından müşterilerimize öneri sunabilmek, hizmetlerimizle ilgili müşterilerimizi bilgilendirebilmek,",
  "Hizmetlerimiz ile ilgili müşteri şikâyet ve önerilerini değerlendirebilmek,",
  "Yasal yükümlülüklerimizi yerine getirebilmek ve yürürlükteki mevzuattan doğan haklarımızı kullanabilmek,",
];

const KVKK_RIGHTS = [
  "İşlenip işlenmediğini öğrenme,",
  "İşlenmişse bilgi talep etme,",
  "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
  "Yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme,",
  "Eksik / yanlış işlenmişse düzeltilmesini isteme,",
  "6698 sayılı Kanun'un 7. maddesinde öngörülen şartlar çerçevesinde silinmesini / yok edilmesini isteme,",
  "Aktarıldığı 3. kişilere yukarıda sayılan (d) ve (e) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme,",
  "Münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
  "6698 sayılı Kişisel Verilerin Korunması Kanunu'na aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahip olduğunuzu hatırlatmak isteriz,",
  "Başvuru formu.",
];

// The article alone, no page chrome — this is what popups embed
// (register consent, pagination "Kullanım Şartları").
export const PrivacyPolicyContent = () => (
  <article className="pt-4 text-[--black-2]">
    <h1 className="text-xl font-bold text-[--black-1]">
      Pentegrasyon Kullanım Şartları
    </h1>

    <P>
      Pentegrasyon ürünü online sipariş platformlarına entegre olarak çalışan
      ve çok yönlü olarak tarafların teknik sorunları nedeni ile zaman zaman
      aksaklıklar yaşanabilecek bir hizmettir. Bu kriterler aşağıdaki gibidir.
    </P>
    <ul className="mb-4 ml-5 list-decimal text-sm leading-relaxed marker:text-[--gr-1]">
      <li>Ürünü/Hizmeti kullanan işletmedeki donanımsal sebepler</li>
      <li>Ürünü/Hizmeti kullanan işletmedeki kişisel kullanıcı hataları</li>
      <li>İnternet servis sağlayıcıdan kaynaklanabilecek kesinti sorunları</li>
      <li>
        Online sipariş platformlarından kaynaklanan teknik sorunlar veya
        güncellemeye dayalı sorunlar
      </li>
      <li>
        Pentegrasyon sunucularında yaşanabilecek teknik veya güncellemeye bağlı
        sorunlar.
      </li>
    </ul>
    <P>
      Yukarıda sayılan sebeplerden dolayı hizmetler bazen tamamen veya kısmen
      çalışmayabilir. Sorun yaşanan süre zarfında oluşabilecek maddi
      kayıplardan dolayı Liwa Yazılım San. Tic. Ltd. Şti. sorumlu tutulamaz.
      Hizmeti satın alan her müşteri bu şartları kabul etmiş sayılır.
    </P>

    <H2>Diğer Kullanıma Dayalı Aydınlatma ve KVKK Metni</H2>
    <P>
      İşbu Gizlilik ve Kullanım Şartları Politikası ile LİWA YAZILIM San. Tic.
      Ltd. Şti.&apos;ne (&quot;LİWA YAZILIM&quot;) aktarılan kişisel verilerin
      korunması konusundaki temel bilgilere yer verileceği gibi, Liwa Yazılıma
      ait <SiteLink /> web sitesi ziyaretçilerine, çerez politikası ve
      politikanın nasıl yönetilebileceği konularında bilgilendirme
      yapılacaktır. Web sitesinde yer alan çerez kullanım uyarısının
      kapatılması ya da web sitesi kullanımına devam edilmesi halinde çerezlere
      onay verildiği kabul edilir. Çerez kullanımını onaylamıyorsanız web
      sitesine devam etmemenizi ya da tarayıcınızdan çerez tercihlerinizi
      değiştirmenizi rica ederiz. Çerezlere izin verilmemesi halinde web
      sitesinin bazı özelliklerinin işlevselliğini yitirebileceğini hatırlatmak
      isteriz. LİWASOFT Yazılım, 6698 sayılı Kişisel Verilerin Korunması Kanunu
      (&quot;6698 sayılı Kanun&quot;) m. 10&apos;da belirtilen aydınlatma
      yükümlülüğünü yerine getirmek amacıyla aşağıdaki sunulan açıklamaları{" "}
      <SiteLink /> web-sitemizi ve/veya mobil uygulamalarımızı kullanan 3.
      kişilerin dikkatine sunar.
    </P>

    <H2 number={1}>
      Liwa Yazılımın kişisel verileri toplamasının yasal dayanağı nedir?
    </H2>
    <P>
      Müşterilerimizin kişisel verilerinin korunması konusunda en temel
      düzenleme 6698 sayılı Kişisel Verilerin Korunması Kanununda yapılmıştır.
      Ayrıca 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanunu da
      kişisel verilerin korunmasına ilişkin hüküm içermektedir. 5237 Sayılı
      Türk Ceza Kanununda ise, kişisel verilerin hukuka aykırı olarak,
      kaydedilmesi, ele geçirilmesi, yayılması ve saklama sürelerinin dolmasına
      rağmen sistem içerisinde silinmesi, yok edilmesi ya da anonim hale
      getirilmemesi halinde, cezai yaptırımlar öngörülmüştür. Diğer yandan,
      6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler
      Yönetmeliği&apos;nden doğan yükümlülüklerimizin ifası amacıyla verilerin
      toplanması ve kullanılması gerekmektedir.
    </P>

    <H2 number={2}>
      Liwa Yazılım kişisel verilerin toplanmasında hangi yöntemleri
      kullanıyor?
    </H2>
    <P>
      <SiteLink /> web sitesinden veya mobil uygulamalardan işlem yapan
      müşterilerimizin kişisel verileri, müşterilerimizin açık rızaları ve
      mevzuat hükümleri uyarınca Liwa Yazılım tarafından işlenmektedir.
      Kullanıcıların kişisel bilgileri, adı - soyadı, doğum tarihi, yüklediği
      dosyalardaki kişilerin bilgileri telefon numarası, e-posta adresi, T.C
      kimlik numarası gibi kullanıcıyı doğrudan ya da dolaylı olarak
      tanımlamaya yönelik her türlü kişisel bilgi olup, bu gizlilik
      politikasında &quot;kişisel bilgiler&quot; olarak anılacaktır. Bu
      Gizlilik Bildirimi, kişisel verilerinizin tarafımızca toplanması,
      kullanımı, paylaşımı, muhafaza edilmesi ve korunması konularını ve bunlar
      ile ilgili haklarınızı açıklamaktadır. Bu Gizlilik Bildirimi mobil
      cihazlar da dahil olmak üzere, erişim veya kullanım yönteminize
      bakılmaksızın, internet sitemiz de dahil olmak üzere, bu Gizlilik
      Bildirimine atıfta bulunulan her tür uygulama ve hizmet sunumuna
      (birlikte, &quot;Hizmetler&quot;) uygulanacaktır. Hizmetlerimizi
      kullanarak ve/veya hesap oluşturarak bu Gizlilik Bildirimi ve Kullanıcı
      Sözleşmemizi kabul etmekte ve bu Gizlilik Bildirimi&apos;nde açıklandığı
      üzere, kişisel verilerinizi toplamamıza, kullanmamıza, gerektiğinde
      üçüncü kişilerle paylaşmamıza, muhafaza etmemize ve korumamıza rıza
      göstermektesiniz.
    </P>
    <P>
      Liwa Yazılıma ait olan <SiteLink /> web sitesi çerez (cookie) kullanan
      bir sitedir. Çerez; kullanılmakta olan cihazın internet tarayıcısına ya
      da sabit diskine depolanarak söz konusu cihazın tespit edilmesine imkân
      tanıyan, çoğunlukla harf ve sayılardan oluşan bir dosyadır. <SiteLink />{" "}
      ziyaretçilerine daha iyi hizmet verebilmek amacıyla ve yasal yükümlülüğü
      çerçevesinde, işbu Kişisel Verilerin Korunması Hakkında Açıklama metninde
      belirlenen amaçlar ve kapsam dışında kullanılmamak kaydı ile gezinme
      bilgilerinizi toplayacak, işleyecek, üçüncü kişilerle paylaşacak ve
      güvenli olarak saklayacaktır. <SiteLink /> çerezleri; günlük dosyaları,
      boş gif dosyaları ve/veya üçüncü taraf kaynakları yoluyla topladığı
      bilgileri tercihlerinizle ilgili bir özet oluşturmak amacıyla depolar.{" "}
      <SiteLink /> size özel tanıtım yapmak, promosyonlar ve pazarlama
      teklifleri sunmak, web sitesinin veya mobil uygulamanın içeriğini size
      göre iyileştirmek ve/veya tercihlerinizi belirlemek amacıyla; site
      üzerinde gezinme bilgilerinizi ve/veya site üzerindeki kullanım
      geçmişinizi izleyebilmektedir. <SiteLink /> çevrimiçi ve çevrimdışı
      olarak toplanan bilgiler gibi farklı yöntemlerle veya farklı zamanlarda
      site üzerinde sizden toplanan bilgileri eşleştirebilir ve bu bilgileri
      üçüncü taraflar gibi başka kaynaklardan alınan bilgilerle birlikte
      kullanabilir. <SiteLink /> mobil uygulamasında oturum çerezleri ve
      kalıcı çerezler kullanmaktadır. Oturum kimliği çerezi, tarayıcınızı
      kapattığınızda sona erer. Kalıcı çerez ise sabit diskinizde uzun bir süre
      kalır. İnternet tarayıcınızın &quot;yardım&quot; dosyasında verilen
      talimatları izleyerek veya &quot;www.allaboutcookies.org&quot; veya
      &quot;www.youronlinechoices.eu&quot; adresini ziyaret ederek kalıcı
      çerezleri kaldırabilir ve hem oturum çerezlerini hem de kalıcı çerezleri
      reddedebilirsiniz. Kalıcı çerezleri veya oturum çerezlerini
      reddederseniz, web sitesini, mobil uygulamayı kullanmaya devam
      edebilirsiniz fakat web sitesinin, mobil uygulamanın tüm işlevlerine
      erişemeyebilirsiniz veya erişiminiz sınırlı olabilir. <SiteLink />,
      internet sayfasını kullanan kullanıcıların istatistiksel bilgileri ve
      yaptığı işlemler sistem tarafından kayıt altında tutulur. Kullanıcı,
      sistem kayıtlarındaki hareketlerinden sorumludur. <SiteLink /> web
      sitesinde sunulan hizmetlerden yararlananlar bütün bu şartları okumuş ve
      kabul etmiş sayılırlar. Liwa Yazılım San. Tic. Ltd. Şti. ait{" "}
      <SiteLink />, Gizlilik Politikası hükümlerini önceden haber vermeksizin
      değiştirme hakkını saklı tutar. Güncel Gizlilik Politikası, Kullanıcıya
      herhangi bir yöntemle sunulduğu tarihte yürürlük kazanır.
    </P>

    <H2 number={3}>İnternet Sitesi Çerezleri Nasıl Kullanılmaktadır?</H2>
    <P>
      Liwa Yazılıma ait olan <SiteLink /> web sitesi çerez (cookie) kullanan
      bir sitedir. Çerez; kullanılmakta olan cihazın internet tarayıcısına ya
      da sabit diskine depolanarak söz konusu cihazın tespit edilmesine olanak
      tanıyan, çoğunlukla harf ve sayılardan oluşan bir dosyadır. <SiteLink />{" "}
      çerezleri; günlük dosyaları, boş gif dosyaları ve/veya üçüncü taraf
      kaynakları yoluyla topladığı bilgileri tercihlerinizle ilgili bir özet
      oluşturmak amacıyla depolar. Oturum çerezleri (session cookies) ve kalıcı
      çerezler (persistent cookies) olmak üzere sitelerimiz genelinde iki tür
      çerez kullanmaktayız. Oturum çerezleri geçici çerezler olup sadece
      tarayıcınızı kapatıncaya kadar geçerlidirler. Kalıcı çerezler siz
      silinceye veya süreleri doluncaya (bu şekilde çerezlerin cihazında ne
      kadar kalacağı, çerezlerin &quot;kullanım ömürlerine&quot; bağlı
      olacaktır) kadar sabit diskinizde kalırlar. <SiteLink /> çerezleri;
      yaptığınız tercihleri hatırlamak ve web sitesi/mobil uygulama
      kullanımınızı kişiselleştirmek için kullanır. Bu kullanım parolanızı
      kaydeden ve web sitesi/mobil uygulama oturumunuzun sürekli açık kalmasını
      sağlayan, böylece her ziyaretinizde birden fazla kez parola girme
      zahmetinden kurtaran çerezleri ve web sitesi/mobil uygulamaya daha
      sonraki ziyaretlerinizde sizi hatırlayan ve tanıyan çerezleri içerir.{" "}
      <SiteLink /> web sitesine nereden bağlandığınız, web sitesi/mobil
      uygulama üzerinde hangi içeriği görüntülediğiniz ve ziyaretinizin süresi
      gibi web sitesini/mobil uygulamayı nasıl kullandığınızın ölçümlenmesi
      dahil olmak üzere web sitesini/mobil uygulamayı nasıl kullandığınızı
      tespit etmek için kullanır. <SiteLink /> web sitesi çerezleri ayrıca;
      arama motorlarını, web sitesi, mobil uygulamasını ve/veya web sitesinin
      reklam verdiği internet sitelerini ziyaret ettiğinizde ilginizi
      çekebileceğini düşündüğü reklamları size sunabilmek için &quot;reklam
      teknolojisini&quot; devreye sokmak amacıyla kullanabilir. Reklam
      teknolojisi, size özel reklamlar sunabilmek için web sitesine/mobil
      uygulamaya ve web sitesinin reklam verdiği web sitelerine/mobil
      uygulamalarına yaptığınız önceki ziyaretlerle ilgili bilgileri kullanır.
      Bu reklamları sunarken, web sitesinin sizi tanıyabilmesi amacıyla
      tarayıcınıza benzersiz bir üçüncü taraf çerezi yerleştirilebilir. Liwa
      Yazılım ayrıca Google, Inc. tarafından sağlanan bir web analizi hizmeti
      olan Google Analytics kullanmaktadır. Google Analytics, çerezleri
      kullanıcıların web sitesini, mobil uygulamayı ve/veya mobil sitesini
      nasıl kullandıklarını istatistiki bilgiler/raporlar ile analiz etmek
      amacıyla kullanır. Google Analytics kullanımı hakkında daha fazla bilgi
      için (reddetme seçenekleri dahil), şu adresi ziyaret edebilirsiniz:{" "}
      <a
        href="http://www.google.com/intl/tr/policies/privacy/#infocollect"
        className="text-[--link-1] hover:underline"
      >
        http://www.google.com/intl/tr/policies/privacy/#infocollect
      </a>{" "}
      Mobil uygulamada çerez yerine ilgili uygulamanın SDK&apos;sı (Software
      Development Kit) kullanılmaktadır. Aşağıdaki yöntemleri kullanarak
      çerezlere izin verme ve reddetme imkanını kullanabilirsiniz:
    </P>
    <ul className="mb-4 ml-5 list-disc text-sm leading-relaxed marker:text-[--gr-1]">
      {BROWSER_STEPS.map(([browser, step]) => (
        <li key={browser}>
          <span className="font-medium text-[--black-1]">{browser}: </span>
          {step}
        </li>
      ))}
    </ul>
    <P>
      Yukarıdaki seçeneklerin yanı sıra; tüm çerezler hakkında bilgi sahibi
      olmak ve çerez yönetimi için: https://www.allaboutcookies.org,
      https://www.youronlinechoices.eu/ adresini ziyaret edebilirsiniz, veya
      &quot;Privacy Badger&quot; uygulamasını kullanabilirsiniz
      (https://www.eff.org/tr/privacybadger). Kalıcı çerezleri veya oturum
      çerezlerini reddederseniz, web sitesini, mobil uygulamayı ve mobil
      sitesini kullanmaya devam edebilirsiniz fakat web sitesinin, mobil
      uygulamanın ve mobil sitesinin tüm işlevlerine erişemeyebilirsiniz veya
      erişiminiz sınırlı olabilir. Liwa Yazılımda yer alan çerezlere ilişkin
      bilgiler aşağıdaki tablolarda yer almaktadır:
    </P>
    {/* This was a run-on paragraph pretending to be a table. */}
    <div className="mb-4 overflow-x-auto rounded-lg border border-solid border-[--border-1]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[--light-3] text-xs uppercase tracking-wide text-[--gr-1]">
            <th className="px-3 py-2 font-medium">Servis Sağlayıcı</th>
            <th className="px-3 py-2 font-medium">Cookie İsmi</th>
            <th className="px-3 py-2 font-medium">Cookie Amacı</th>
            <th className="px-3 py-2 font-medium">Cookie Tipi</th>
            <th className="px-3 py-2 font-medium">Cookie Süresi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[--border-1]">
          {COOKIE_TABLE.map((c) => (
            <tr key={c.name}>
              <td className="px-3 py-2 whitespace-nowrap">{c.provider}</td>
              <td className="px-3 py-2 whitespace-nowrap">{c.name}</td>
              <td className="px-3 py-2">{c.purpose}</td>
              <td className="px-3 py-2 whitespace-nowrap">{c.type}</td>
              <td className="px-3 py-2 whitespace-nowrap">{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <H2 number={4}>Liwa Yazılım kişisel verileri hangi amaçlarla kullanıyor?</H2>
    <P>
      Liwa Yazılım, mevzuatın izin verdiği durumlarda amacına uygun olarak ve
      ölçülü bir şekilde kişisel bilgilerinizi işleyebilecek, kaydedebilecek,
      güvenli bir biçimde saklayabilecek, güncelleyebilecek, üçüncü kişilere
      açıklayabilecek, devredebilecek, sınıflandırabilecektir. Liwa Yazılımda
      kişisel verileriniz şu amaçlarla kullanılmaktadır:
    </P>
    <ul className="mb-4 ml-5 list-disc text-sm leading-relaxed marker:text-[--gr-1]">
      {USAGE_PURPOSES.map((purpose) => (
        <li key={purpose.slice(0, 40)}>{purpose}</li>
      ))}
    </ul>

    <H2 number={5}>Liwa Yazılım kişisel verilerinizi nasıl koruyor?</H2>
    <P>
      Liwa Yazılım ile paylaşılan kişisel veriler, Liwa Yazılım gözetimi ve
      kontrolü altındadır. Liwa Yazılım, yürürlükteki ilgili mevzuat hükümleri
      gereğince bilginin gizliliğinin ve bütünlüğünün korunması amacıyla
      gerekli organizasyonu kurmak ve teknik önlemleri almak ve uyarlamak
      konusunda veri sorumlusu sıfatıyla sorumluluğu üstlenmiştir. Bu konudaki
      yükümlülüğümüzün bilincinde olarak veri gizliliğini konu alan
      uluslararası ve ulusal teknik standartlara uygun surette periyodik
      aralıklarda sızma testleri yaptırılmakta ve bu kapsamda veri işleme
      politikalarımızı her zaman güncellediğimizi bilginize sunarız.
    </P>

    <H2 number={6}>Liwa Yazılım kişisel verilerinizi paylaşıyor mu?</H2>
    <P>
      Müşterilerimize ait kişisel verilerin üçüncü kişiler ile paylaşımı,
      müşterilerin izni çerçevesinde gerçekleşmekte ve kural olarak müşterimizin
      onayı olmaksızın kişisel verileri üçüncü kişilerle paylaşılmamaktadır.
      Bununla birlikte, yasal yükümlülüklerimiz nedeniyle ve bunlarla sınırlı
      olmak üzere mahkemeler ve diğer kamu kurumları ile kişisel veriler
      paylaşılmaktadır. Ayrıca, taahhüt ettiğimiz hizmetleri sağlayabilmek ve
      verilen hizmetlerin kalite kontrolünü yapabilmek için anlaşmalı üçüncü
      kişilere kişisel veri aktarımı yapılmaktadır. Üçüncü kişilere veri
      aktarımı sırasında hak ihlallerini önlemek için gerekli teknik ve hukuki
      önlemler alınmaktadır. Bununla birlikte, kişisel verileri alan üçüncü
      kişinin veri koruma politikalarından dolayı ve üçüncü kişinin
      sorumluluğundaki risk alanında meydana gelen ihlallerden Liwa Yazılım
      sorumlu değildir. Kişisel verileriniz Liwa Yazılımın hissedarlarıyla,
      doğrudan/dolaylı yurtiçi/yurtdışı faaliyetlerimizi yürütebilmek için
      işbirliği yaptığımız program ortağı kurum, kuruluşlarla, verilerin bulut
      ortamında saklanması hizmeti aldığımız yurtiçi/yurtdışı kişi ve
      kurumlarla, müşterilerimize ticari elektronik iletilerin gönderilmesi
      konusunda anlaşmalı olduğumuz yurtiçi/yurtdışındaki kuruluşlarla,
      Bankalar arası Kart Merkeziyle, anlaşmalı olduğumuz bankalarla ve sizlere
      daha iyi hizmet sunabilmek ve müşteri memnuniyetini sağlayabilmek için
      çeşitli pazarlama faaliyetleri kapsamında yurtiçi ve yurtdışındaki
      çeşitli ajans, reklam şirketleri ve anket şirketleriyle ve
      yurtiçi/yurtdışı diğer üçüncü kişilerle ve ilgili iş ortaklarımızla
      paylaşılabilmektedir.
    </P>

    <H2 number={7}>
      Kişisel Verilerin Korunması Kanunu&apos;ndan doğan haklarınız nelerdir?
    </H2>
    <P>6698 sayılı Kanun uyarınca kişisel verilerinizin;</P>
    <ul className="mb-4 ml-5 list-[lower-alpha] text-sm leading-relaxed marker:text-[--gr-1]">
      {KVKK_RIGHTS.map((right) => (
        <li key={right.slice(0, 40)}>{right}</li>
      ))}
    </ul>

    <H2 number={8}>
      Kişisel verilerle ilgili mevzuat değişikliklerinden nasıl haberdar
      olabilirim?
    </H2>
    <P>
      6698 sayılı Kanun uyarınca, sahip olduğunuz haklar Liwa Yazılım
      yükümlülükleridir. Kişisel verilerinizi bu bilinçle ve mevzuatın
      gerektirdiği ölçüde işlediğimizi, yasal değişikliklerin olması halinde
      sayfamızda yer alan bu bilgileri yeni mevzuata uygun güncelleyeceğimizi,
      yapılan güncellemeleri de bu sayfa üzerinden her zaman kolaylıkla takip
      edebileceğinizi size bildirmek isteriz.
    </P>

    <H2 number={9}>
      Verinin güncel ve doğru tutulduğundan nasıl emin olabilirim?
    </H2>
    <P>
      6698 sayılı Kanun&apos;un 4. maddesi uyarınca Liwa Yazılımın kişisel
      verilerinizi doğru ve güncel olarak tutma yükümlülüğü bulunmaktadır. Bu
      kapsamda Liwa Yazılımın yürürlükteki mevzuattan doğan yükümlülüklerini
      yerine getirebilmesi için müşterilerimizin Liwa Yazılım doğru ve güncel
      verilerini paylaşması gerekmektedir. Verilerinizin herhangi bir surette
      değişikliğe uğraması halinde aşağıda belirtilen iletişim kanallarından
      bizimle iletişime geçerek verilerinizi güncellemenizi rica ederiz.
    </P>

    <H2 number={10}>
      Liwa Yazılıma kişisel verilerinizle ilgili soru sormak ister misiniz?
    </H2>
    <P>
      Kişisel verilerinizle ilgili her türlü soru ve görüşleriniz için{" "}
      <a
        href="mailto:support@pentegrasyon.net"
        className="text-[--link-1] hover:underline"
      >
        support@pentegrasyon.net
      </a>{" "}
      posta adresinden dilediğiniz zaman bize ulaşabilirsiniz.
    </P>
  </article>
);

// Standalone page for the /privacy-policy route (public — linked from the
// auth pages' footer), so it brings its own chrome: brand bar + content card.
const PrivacyPolicy = () => (
  <section className="min-h-dvh bg-[--white-2]">
    <header className="sticky top-0 z-10 border-b border-solid border-[--border-1] bg-[--white-1]">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center px-4">
        <Link to="/" className="font-[conthrax] text-lg text-[--primary-1]">
          Pentegrasyon
        </Link>
      </div>
    </header>

    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="rounded-xl border border-solid border-[--border-1] bg-[--white-1] p-6 sm:p-10">
        <PrivacyPolicyContent />
      </div>
    </main>
  </section>
);

export default PrivacyPolicy;
