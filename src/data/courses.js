export const COURSES = [
    {
        id: 'elo2',
        title: 'Elektronik II (Advanced Master)',
        content: String.raw`
# Sınav Analiz Notu Üretici v3.1 (ELO2 – GEÇME ODAKLI)

Bu belge, **05.01.2026 Final**, **29.01.2025 Büt** ve **2021-2024 Arşivi** taranarak hazırlanmıştır. Sadece puan getiren, sınavda "kalemi oynatmanı" sağlayan bilgiler içerir.

---

## KONU 1: GERİ BESLEMELİ YÜKSELTEÇ ANALİZİ (FEEDBACK)
*(Banko Soru. Her sınavda 20-30 puan. Genelde 1. veya 2. soru.)*

> **keywords:** voltage_shunt, gerilim_paralel, current_series, akım_seri, Rmf, Avf, D_factor, yukleme_etkisi, norton_donusumu

**Öncelik Skoru:** 10/10  
**Sınav İstatistikleri:**
*   **05.01.2026 Final (Soru 1):** BJT Gerilim-Paralel (Voltage-Shunt)
*   **29.01.2025 Büt (Soru 3):** BJT Gerilim-Paralel (A-B arası direnç ile)
*   **28.01.2023 Büt (Soru 2):** BJT Gerilim-Paralel ($A_{vf}=-5$ istenmiş)
*   **02.02.2021 Final (Soru 2):** BJT Gerilim-Paralel

**Kritik Teori:**
Devrede çıkıştan girişe bir direnç ($R_f$) veya emiter direnci ($R_E$) üzerinden bağlantı varsa geri besleme vardır.
1.  **Topoloji:** Çıkıştan voltaj mı akım mı alınıyor? Girişe voltaj (seri) mı akım (paralel) mı veriliyor?
2.  **Yükleme:** Devreyi analiz etmek için geri beslemeyi koparman lazım ama dirençleri ("Yükleme Etkisi") eklemeyi unutmamalısın.

**Temel Formüller:**
*   **İyileştirme Faktörü:** $D = 1 + \beta A$ (Burada $A$; $R_m, G_m, A_v$ olabilir)
*   **Gerilim-Paralel $\beta$:** $\beta = -\frac{1}{R_f}$ (Birim: Siemens veya A/V)
*   **Geri Beslemeli Kazanç:** $R_{mf} = \frac{R_m}{D}$ (Gerilim-Paralel için)
*   **Voltaj Kazancına Dönüş:** $A_{vf} = \frac{V_o}{V_s} = \frac{R_{mf}}{R_s}$ (Kaynak direnci $R_s$ ise)

> Hoca Buradan Puan Kırar: Giriş devresini çizerken çıkışı sıfırlamayı ($V_o=0$) unutup $R_f$'yi toprağa bağlamazsan analiz çöker. Ayrıca $R_m$ (Transfer direnci) bulup bırakırsan puan gider; hoca $A_v$ (Gerilim kazancı) ister. Mutlaka $R_s$'ye böl. Sonuçta $D$ (İyileştirme faktörü) 1'den küçük çıkarsa işlem hatası var demektir.

**Sınavda Ezberden Yazılacak İlk 6 Satır:**
*(Soru Gerilim-Paralel ise - Kollektörden baza direnç varsa)*
1.  **Topoloji:** Çıkıştan gerilim (Paralel), Girişe akım (Paralel) $\rightarrow$ Gerilim-Paralel (Voltage-Shunt).
2.  **Yükleme Etkisi:** Giriş devresi için $V_o=0$ yapılır, $R_f$ girişe paralel gelir.
3.  **Yükleme Etkisi:** Çıkış devresi için $V_i=0$ yapılır, $R_f$ çıkışa paralel gelir.
4.  **$\beta$ Değeri:** $\beta = I_f / V_o = -1 / R_f$.
5.  **Hedef:** Önce $R_m = V_o / I_s$ bulunacak, sonra $A_{vf} = R_{mf} / R_s$ hesaplanacak.
6.  **Analiz:** Giriş direncini ($R_i = R_s // R_b // R_f // h_{ie}$) hesaplayarak başlıyorum.

---

## KONU 2: OSİLATÖRLER (TÜRETME VE ANALİZ)
*(Son yıllarda "Basitleştirilmiş Eşdeğer" üzerinden türetme çok moda.)*

> **keywords:** osilator, oscillator, Barkhausen, tank_devresi, rezonans, esdeger_devre, sanal_kisim_sifir

**Öncelik Skoru:** 9/10  
**Sınav İstatistikleri:**
*   **05.01.2026 Final (Soru 2):** Basitleştirilmiş Hartley ($w_0$ ve $k$ türetimi)
*   **29.01.2025 Büt (Soru 4):** FET'li Colpitts Türetimi
*   **10.02.2024 Büt (Soru 1):** Basitleştirilmiş Osilatör ($w_0$ ve $k$)
*   **Defter Notu:** FET'li Colpitts ve Hartley detaylı türetimi

**Kritik Teori:**
Barkhausen kriterine göre döngü kazancı 1 olmalı ($|A\beta|=1$). Devrenin AC eşdeğerinde, sanal kısımların toplamı sıfır olduğunda osilasyon başlar (Rezonans). Reel kısımlar ise kazanç şartını belirler.

**Temel Formüller:**
*   **Empedans Yöntemi (Basit Devreler İçin):** $Z_1 + Z_2 + Z_3 = 0$ (Genelde $X_1+X_2+X_3=0$).
*   **Colpitts Frekansı:** $\omega_0 = \frac{1}{\sqrt{L C_{eq}}}$ , $C_{eq} = \frac{C_1 C_2}{C_1 + C_2}$.
*   **Hartley Frekansı:** $\omega_0 = \frac{1}{\sqrt{C(L_1+L_2)}}$.
*   **Kazanç Şartı (BJT/FET):** $g_m R_L \ge \frac{C_2}{C_1}$ (Colpitts) veya $h_{fe} \ge \frac{L_1}{L_2}$ (Hartley).

> Hoca Buradan Puan Kırar: Basitleştirilmiş devrede $Z_1, Z_2$ yerine yanlış elemanları koyarsan. (Kapasitörler $1/j\omega C$, Bobinler $j\omega L$ olarak yazılmalı). $j^2 = -1$ dönüşümünü yaparken işaret hatası yaparsan frekans formülü karekök içinde negatif çıkar.

**Sınavda Ezberden Yazılacak İlk 6 Satır:**
*(Soru Hartley veya Colpitts Türetimi ise)*
1.  Devrenin AC eşdeğerini çizip Kirchhoff Akım Yasası (KCL) uyguluyorum.
2.  Sistemin osilasyon yapması için Barkhausen kriteri sağlanmalıdır ($Im=0, Re \ge 1$).
3.  Elde edilecek karakteristik denklemin **sanal (imajiner)** kısmı sıfıra eşitlenerek osilasyon frekansı ($\omega_0$) bulunur.
4.  Denklemin **reel** kısmı sıfıra (veya kazanca) eşitlenerek başlangıç şartı ($g_m$ veya $h_{fe}$) bulunur.
5.  Düğüm denklemleri matrisi: $\Delta = 0$ şartı aranır.
6.  Empedanslar: $Z_L = j\omega L$ ve $Z_C = \frac{1}{j\omega C}$ olarak alınır.

---

## KONU 3: SCHMITT TRIGGER VE ENDÜSTRİYEL TASARIM
*(Büt sınavlarının vazgeçilmezi. Sıcaklık/Işık kontrolü senaryoları.)*

> **keywords:** schmitt_trigger, histerezis, endustriyel_tasarim, VUT, VLT, superpozisyon, sicaklik_kontrolu

**Öncelik Skoru:** 8/10 (Finalde çıkmadıysa Bütte %99 gelir)  
**Sınav İstatistikleri:**
*   **29.01.2025 Büt (Soru 2):** $20-25^\circ C$ sıcaklık kontrolü, LED ilavesi.
*   **28.01.2023 Büt (Soru 1):** Transfer karakteristiği verilen Schmitt Trigger tasarımı.
*   **Defter Notu:** Sıcaklık kontrolü, histeresiz eğrisi, $V_{UT}, V_{LT}$ hesabı.

**Kritik Teori:**
Sensörden gelen voltajı referans voltajla karşılaştırır. Ancak tek bir nokta yerine iki eşik noktası ($V_{UT}$ ve $V_{LT}$) vardır. Bu aralığa **Histeresiz** denir. Hesaplamada **Süperpozisyon** şarttır.

**Temel Formüller:**
*   **Op-Amp (+) Giriş Voltajı (Süperpozisyon):**
    $V_+ = V_{ref} \frac{R_f}{R_1 + R_f} + V_{out} \frac{R_1}{R_1 + R_f}$ (Burada $V_{out} = \pm V_{sat}$).
*   **Üst ve Alt Eşik:** Denklemi bir $+V_{sat}$ için, bir de $-V_{sat}$ için yazıp $V_{UT}$ ve $V_{LT}$'ye eşitle.
*   **Histeresiz Voltajı:** $V_H = V_{UT} - V_{LT}$.

> Hoca Buradan Puan Kırar: Soru "Soğutucu çalışsın" diyorsa çıkışın ne zaman aktif olacağını yanlış belirlersen (Ters histeresiz). Transfer karakteristiği (Histeresiz eğrisi) çizilmezse veya eksenler ($V_{in}, V_{out}$) yanlış işaretlenirse.

**Sınavda Ezberden Yazılacak İlk 6 Satır:**
1.  İstenen çalışma aralığı $V_{UT} = \dots$ V ve $V_{LT} = \dots$ V olarak belirlenmiştir.
2.  Devre **Schmitt Tetikleyici** (Schmitt Trigger) yapısındadır ve histeresiz özelliği kullanılır.
3.  Op-amp'ın evirmeyen (+) ucundaki gerilimi **Süperpozisyon** teoremi ile yazarım.
4.  Çıkış gerilimi op-amp doyumda olduğu için sadece $+V_{cc}$ veya $-V_{cc}$ değerlerini alır.
5.  $V_A = V_{cc} \frac{R_1}{R_1+R_2} + V_{ref} \frac{R_2}{R_1+R_2}$ (Çıkış pozitifken).
6.  İki bilinmeyenli denklem sistemi kurarak $R_1/R_2$ oranını ve $V_{ref}$ değerini bulacağım.

---

## KONU 4: DALGA ŞEKLİ ÜRETEÇLERİ (KARE VE ÜÇGEN)
*(Formül sorusu. Tasarım istenirse kapasitörü sen seçersin.)*

> **keywords:** dalga_ureteci, kare_dalga, ucgen_dalga, astable_multivibrator, periyot, frekans, crest_factor, tepe_faktoru

**Öncelik Skoru:** 7/10  
**Sınav İstatistikleri:**
*   **05.01.2026 Final (Soru 3):** Op-amp Kare Dalga, $f=2kHz$ hesabı, Crest Faktörü.
*   **08.01.2025 Dönem Sonu (Soru 1):** Üçgen dalga çizimi ve tasarımı.
*   **Defter Notu:** Kare dalga periyot türetimi, Üçgen dalga frekansı.

**Kritik Teori:**
Kare dalga için Schmitt Trigger + RC devresi (Astable Multivibrator). Üçgen dalga için bu devrenin ucuna bir İntegral Alıcı (Integrator) eklenir.

**Temel Formüller:**
*   **Kare Dalga Periyodu:** $T = 2RC \ln(1 + \frac{2R_1}{R_2})$.
*   **Pratik Kare Dalga:** $R_1 = R_2$ seçilirse $T \approx 2.2 RC$.
*   **Üçgen Dalga Frekansı:** $f = \frac{1}{4RC} \frac{R_2}{R_1}$.
*   **Crest (Tepe) Faktörü:** $CF = V_{max} / V_{rms}$ (Kare=1, Sinüs=$\sqrt{2}$, Üçgen=$\sqrt{3}$).

> Hoca Buradan Puan Kırar: Tasarım sorusunda $C$ değerini (örneğin 10nF) kendin seçmeyip denklemi çözümsüz bırakırsan. Crest faktörü sorulduğunda birimi veya tanımı yanlış yazarsan.

**Sınavda Ezberden Yazılacak İlk 6 Satır:**
1.  Devre, bir Schmitt tetikleyici ve RC zamanlama devresinden oluşan **Kararsız (Astable) Multivibratör**dür.
2.  Kondansatör $V_c$ gerilimi, eşik değerleri arasında üstel olarak dolar ve boşalır.
3.  Periyot formülü: $T = 2RC \ln(1 + 2R_1/R_2)$.
4.  Tasarım kolaylığı için $R_1 = R_2$ seçilirse $T \approx 2.2 RC$ olur.
5.  Kondansatör değeri olarak standart $C = 10 nF$ (veya $100 nF$) seçiyorum.
6.  Verilen frekans ($f=1/T$) kullanılarak gerekli $R$ direnci hesaplanır.

---

# ELEKTRONİK II - SINAV STRATEJİ RAPORU (WAR ROOM DATA)
---
## BÖLÜM 1: HOCA İSTİHBARATI (🚨 WARNINGS)

> 🚨 **PUAN TUZAĞI:** **Geri Besleme (Feedback)** sorularında, özellikle **Gerilim-Paralel (Voltage-Shunt)** topolojisinde, $R_o$ (Çıkış Direnci) hesaplarken $R_L$ (Yük Direnci) devreden **ÇIKARILMALIDIR** ($\infty$ yapılır). Ancak $A_v$ (Gerilim Kazancı) hesaplarken $R_L$ devreye **DAHİL EDİLMELİDİR**. Bunu karıştırırsan sorunun yarısı gider.

> 🚨 **DİKKAT:** Hoca, **Osilatör Türetme** sorularında (Colpitts/Hartley) "Sanal Kısım = 0" diyerek frekansı bulmanı, ardından bulduğun $\omega^2$ değerini "Reel Kısım" denklemine yazarak kazanç şartını ($g_m$ veya $h_{fe}$) bulmanı bekler. Sadece frekansı bulup bırakma, puan kırılır.

> 🚨 **KESİN ÇIKAR:** **Gerilim-Paralel (Voltage-Shunt) Geri Besleme** konusu, son 5 yılın (2021-2026) sınavlarının neredeyse tamamında (Final veya Büt) sorulmuştur. Kollektörden Baza giden bir direnç ($R_f$) gördüğün an bu topolojiyi uygula.

> 🚨 **PUAN TUZAĞI:** **Schmitt Trigger** tasarım sorularında (Sıcaklık kontrolü vb.), histeresiz eğrisini çizmezsen ve eksenleri ($V_{in}, V_{out}$) doğru isimlendirmezsen tam puan alamazsın. Ayrıca çıkış gerilimi op-amp'ın besleme gerilimine ($V_{cc}$) eşittir, soruda verilmediyse op-amp beslemesini baz al.

> 🚨 **DİKKAT:** **Crest (Tepe) Faktörü** sorusu son yıllarda ek puan sorusu olarak gelmeye başladı. Kare dalga için 1, Üçgen için $\sqrt{3}$, Sinüs için $\sqrt{2}$ olduğunu ezbere bilmelisin.

---
## BÖLÜM 2: FORMÜL BANKASI (📐 FORMULAS)

### Geri Besleme (Feedback)
*   **İyileştirme (Duyarlılık) Faktörü:** $$ D = 1 + \beta A $$
    *   *Değişkenler:* $\beta$ = Geri besleme oranı, $A$ = Açık döngü kazancı ($R_m, G_m, A_v$)
    *   *İpucu:* $D$ değeri negatif çıkarsa işlem hatası yaptın demektir (Negatif geri besleme için $D>1$).
*   **Gerilim-Paralel Beta:** $$ \beta = -\frac{1}{R_f} $$
    *   *Değişkenler:* $R_f$ = Geri besleme direnci (Kollektör-Baz arası)
    *   *İpucu:* Birimi Siemens (A/V)'dir.
*   **Gerilim Kazancı (Gerilim-Paralel için):** $$ A_{vf} = \frac{R_{mf}}{R_s} $$
    *   *Değişkenler:* $R_{mf}$ = Kapalı döngü transfer direnci ($R_m/D$), $R_s$ = Kaynak direnci.

### Osilatörler
*   **Genel Empedans Kuralı:** $$ Z_1 + Z_2 + Z_3 = 0 $$
    *   *İpucu:* Basitleştirilmiş "Kutu" sorularında reaktif elemanların toplamını sıfıra eşitle.
*   **Hartley Frekansı:** $$ \omega_0 = \frac{1}{\sqrt{C(L_1+L_2)}} $$
    *   *Değişkenler:* $L_1, L_2$ = Bobinler, $C$ = Kapasitör.
*   **Colpitts Frekansı:** $$ \omega_0 = \frac{1}{\sqrt{L \cdot \frac{C_1 C_2}{C_1+C_2}}} $$
    *   *İpucu:* Kapasitörler seri bağlı gibi düşünülür ($C_{eş}$).

### Op-Amp & Dalga Üreteçleri
*   **Schmitt Eşik Gerilimi (Süperpozisyon):** $$ V_{eşik} = \pm V_{sat} \frac{R_1}{R_1+R_2} + V_{ref} \frac{R_2}{R_1+R_2} $$
    *   *Değişkenler:* $V_{sat}$ = Çıkış gerilimi ($\pm V_{cc}$), $V_{ref}$ = Referans voltajı.
*   **Kare Dalga Periyodu:** $$ T = 2RC \ln(1 + \frac{2R_1}{R_2}) $$
    *   *İpucu:* Eğer $R_1=R_2$ seçersen $T \approx 2.2 RC$ olur.
*   **Crest (Tepe) Faktörü:** $$ CF = \frac{V_{max}}{V_{rms}} $$

---
## BÖLÜM 3: EZBER KARTLARI (💡 CHEAT SHEET)

*   **Barkhausen Kriteri** nedir? : Osilasyonun başlaması için döngü kazancının $|A\beta| \ge 1$ ve toplam faz farkının $0^\circ$ (veya $360^\circ$) olması şartıdır.
*   **Yükleme Etkisi (Loading Effect)** nedir? : Geri besleme ağının ana amplifikatöre ekstra bir yük (direnç) gibi davranmasıdır. Giriş devresi çizilirken $V_o=0$, çıkış çizilirken $V_i=0$ (paralel) veya $I_i=0$ (seri) yapılarak hesaba katılır.
*   **Histeresiz** nedir? : Schmitt Trigger devrelerinde, gürültüden etkilenmemek için açma ($V_{UT}$) ve kapama ($V_{LT}$) gerilimleri arasında bırakılan voltaj farkıdır ($V_H = V_{UT} - V_{LT}$).
*   **Gerilim-Paralel Topoloji** nasıl tanınır? : Çıkıştan voltaj alınıyorsa (paralel uç), girişe akım düğümüyle bağlanıyorsa (paralel kol). Pratik olarak: BJT'de Kollektör ile Baz arasında direnç varsa.
*   **Crest Faktörü** değerleri nedir? : Kare Dalga = 1, Sinüs = 1.414 ($\sqrt{2}$), Üçgen = 1.732 ($\sqrt{3}$).

---
## BÖLÜM 4: ADIM ADIM ÇÖZÜM REÇETELERİ (🛠️ RECIPES)

### Soru Tipi: Gerilim-Paralel (Voltage-Shunt) Geri Besleme Analizi
1.  **Adım 1:** **Topolojiyi Belirle:** "Çıkış Gerilim, Giriş Akım (Paralel)". $\beta = -1/R_f$ olduğunu not et.
2.  **Adım 2:** **Devreyi Ayır:** Giriş devresini çizerken çıkışı kısa devre ($V_o=0$) yap ($R_f$ girişe paralel gelir). Çıkış devresini çizerken girişi kısa devre ($V_i=0$) yap ($R_f$ çıkışa paralel gelir). Kaynağı Norton'a çevir ($I_s = V_s/R_s$).
3.  **Adım 3:** **Açık Döngü Analizi:** $R_m = V_o / I_s$ değerini klasik analizle bul. Sonra $D = 1 + \beta R_m$ hesapla. Sonuçları $D$ ile bölerek ($R_{if}, R_{of}, R_{mf}$) kapalı döngü değerlerine ulaş. En son $A_{vf} = R_{mf} / R_s$ yapmayı unutma.

### Soru Tipi: Osilatör Türetimi (Hartley/Colpitts)
1.  **Adım 1:** **AC Eşdeğer:** Transistör yerine eşdeğerini koy, $L$ yerine $j\omega L$, $C$ yerine $1/j\omega C$ yaz.
2.  **Adım 2:** **Düğüm Analizi:** Devreye KCL (Kirchhoff Akım Yasası) uygula ve matris formunda düzenle. Paydaları eşitle.
3.  **Adım 3:** **Reel/Sanal Ayrımı:** Elde ettiğin denklemin **Sanal ($j$)** kısmını sıfıra eşitle $\rightarrow$ Frekansı ($\omega_0$) verir. **Reel** kısmını sıfıra eşitle $\rightarrow$ Kazanç şartını ($g_m, h_{fe}$) verir.

### Soru Tipi: Schmitt Trigger Tasarımı (Sıcaklık Kontrolü)
1.  **Adım 1:** **Eğri Çiz:** Sorudaki sıcaklıkları voltaja çevir (örn: $20^\circ C \to 2V$). Histeresiz eğrisini çiz, $V_{UT}$ ve $V_{LT}$ değerlerini eksene yaz. Çıkış voltajı $\pm V_{cc}$'dir.
2.  **Adım 2:** **Süperpozisyon:** Op-amp'ın (+) ucundaki gerilim denklemini yaz: $V_+ = V_{ref}\frac{R_2}{R_1+R_2} + V_{out}\frac{R_1}{R_1+R_2}$.
3.  **Adım 3:** **Denklem Çöz:**
    *   $V_{out} = +V_{cc}$ iken $V_+ = V_{UT}$ (Üst Eşik).
    *   $V_{out} = -V_{cc}$ iken $V_+ = V_{LT}$ (Alt Eşik).
    *   Bu iki denklemi taraf tarafa toplayıp/çıkararak $R_1/R_2$ oranını ve $V_{ref}$ değerini bul.
`
    },
    {
        id: 'sdk',
        title: 'Sistem Dinamiği ve Kontrol (Hazırlanıyor)',
        content: String.raw`
# SİSTEM DİNAMİĞİ VE KONTROL

---

## 1. LAPLACE VE TRANSFER FONKSİYONU

> **keywords:** laplace, transfer_function, s_domain, başlangıç_koşulu

Bu dersin içeriği hazırlanmaktadır. Lütfen daha sonra tekrar kontrol edin.
`
    }
];
