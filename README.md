# DersNotuCikarici v2.0 (Master Edition)

Bu proje, üniversite öğrencileri için geliştirilmiş modern, yapay zeka destekli ve sınav odaklı bir dijital ders notu platformudur. "Ders notu okumak sıkıcıdır" tabusunu yıkmak için tasarlanmıştır.

## 🚀 Öne Çıkan Özellikler

### 1. Akıllı "Sınav Uyarı" Sistemi ⚠️
Uygulama, ders notları içerisindeki **"Hoca Puan Kırar"**, **"Tuzak Soru"** gibi kritik uyarıları otomatik olarak algılar ve bunları **Kırmızı Dikkat Kutuları** (Alert Box) içinde gösterir. Sınavda hayat kurtaran detaylar artık gözden kaçmaz.

### 2. Zen (Odaklanma) Modu 🧘‍♂️
Derinlemesine çalışma seansları için geliştirildi. Tek tuşla (**Odaklan** butonu):
- Yan menü (Sidebar) gizlenir.
- Arama çubuğu ve dikkat dağıtıcı öğeler kaybolur.
- İçerik ekranın ortasına odaklanır ve tipografi okuma için optimize edilir.

### 3. Dinamik Karanlık Mod 🌙
- Tailwind CSS v4 ve CSS Değişkenleri ile güçlendirilmiş, pürüzsüz geçişli karanlık mod.
- **Yüksek Kontrast:** Koyu lacivert (`Slate-950`) arkaplan üzerine açık gri metinlerle göz yormayan deneyim.
- Sistem tercihine duyarlı başlangıç.

### 4. Gelişmiş İçerik Motoru
- **KaTeX Desteği:** En karmaşık türev/integral formülleri bile kusursuz render edilir.
- **Fuse.js Arama:** Binlerce satır not içinde "fuzzy search" (hatalı yazıma toleranslı) arama yapın.
- **Etiket Sistemi:** Konular `#keywords` ile etiketlenir ve hızlıca filtrelenebilir.

## 🛠️ Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
# -> http://localhost:5173 adresine gidin
```

## 🏗️ Teknoloji Stack'i
- **Core:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (New Engine)
- **Math:** KaTeX + Rehype/Remark
- **Search:** Fuse.js
- **Icons:** Lucide React

---
*Developed by Antigravity Agents*
