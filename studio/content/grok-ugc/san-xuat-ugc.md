# Làm quảng cáo UGC thật: Grok Bot + công cụ web (Higgsfield / Dreamina)

Đây là quy trình bạn **làm thật và quay màn hình**. Gồm 3 phần:
1. Tạo bot trong Grok Bot (và dán **instructions** cho bot)
2. Dùng bot viết kịch bản + prompt
3. Lên web tạo nhân vật → ảnh nhân vật cầm sản phẩm → video Seedance 2.5 → ghép

Thay `[PRODUCT]`, `[DESC]` (1 câu mô tả), `[OFFER]` (ưu đãi, nếu có).

> Đã kiểm tra ngày 27/11/2026 trên trang chủ (chưa đăng nhập, chưa tốn credit): **Higgsfield** có Seedance 2.5,
> Soul / AI Influencer (tạo nhân vật), Banana Placement (đặt sản phẩm vào ảnh), Lipsync Studio, Marketing Studio.
> **Dreamina** có Seedance 2.5 Flash, Seedream 5.5 (ảnh), AI Avatar. Tên nút bên trong app có thể khác chút:
> nếu khác thì làm theo chức năng tương đương.

---

## PHẦN 1 — Tạo bot trong Grok Bot

### 1.1 Bot "AI UGC Studio"
1. Mở Grok Bot → **+ New channel** → `Ad Factory`.
2. **New Bot** → Name: `AI UGC Studio` → Title: `Writes UGC ad scripts and video prompts`.
3. Ô **Description / Instructions**, dán nguyên khối này:

```
You are AI UGC Studio, the ad creative teammate for [PRODUCT] — [DESC].

Your job:
1. When I send a reference ad (link or file): download it, then break it down —
   hook (first 2 s), every cut with timestamps, what is on screen, every spoken word
   (with word count), on-screen text, the CTA, and 3 reasons it works.
2. Write a new UGC script for [PRODUCT] that keeps the reference's structure and length.
3. Turn the script into ready-to-paste prompts:
   - one IMAGE prompt for the creator (character sheet),
   - one IMAGE prompt for the first frame (creator holding [PRODUCT]),
   - one VIDEO prompt per shot for Seedance 2.5 (scene, camera, action, exact dialogue, style, duration).
4. Make variations on request (different creator, setting or hook) without changing the product facts.

Rules:
- Vertical 9:16, phone-selfie look, natural light, real-home settings.
- Spoken lines: casual, short sentences, about 2.5 words per second.
- Never invent results, health/medical effects, prices, or "I've used it for years" stories.
  Describe a moment of using the product instead. Facts about the product only from what I tell you.
- Always show me the script and prompts first; don't generate videos until I say "go".
- Save finished files to Google Drive folder "[PRODUCT] ads".
```

4. **Plugins**: thêm Google Drive, plugin nghiên cứu X, và plugin tạo video (Higgsfield) nếu có.
   Không có plugin video cũng được: bot chỉ viết prompt, bạn dán prompt lên web (Phần 3).

### 1.2 Bot "Ads Manager" (làm sau, cho cảnh launch)
**+ New channel** `Management` → **New Bot** `Ads Manager`, instructions:
```
You are Ads Manager for [PRODUCT]. You launch and watch Meta ad campaigns made from
the files AI UGC Studio hands you.
- Put new creatives for one test in one ad set with one budget.
- Hard limit: never spend more than $25/day and never publish without my explicit OK.
- If something is missing (page, pixel, payment), tell me exactly what to connect; don't guess.
- Every morning at 9:00 post: spend, stop rate (3-sec views), click rate, cost per sale for each ad.
- After 3 days, suggest pausing the weakest ad and moving its budget to the best one.
```
Thêm cả 2 bot vào channel Management.

---

## PHẦN 2 — Cho bot viết kịch bản + prompt (trong chat)

### 2.1 Gửi quảng cáo mẫu
Tìm 1 quảng cáo cùng ngành trên Meta Ad Library / TikTok (1 người, 1 phòng, < 30 s), rồi gửi:
```
[link]
Download this ad and break it down.
```

### 2.2 Gửi ảnh sản phẩm + yêu cầu kịch bản
Kéo ảnh sản phẩm (chính diện, nền trơn) vào chat:
```
This is [PRODUCT]. Facts: [3–5 TRUE FACTS: size, ingredients, how to use, price/offer].
Write a 20-second UGC script for it with the same structure as the reference:
hook – problem – product moment – how it feels – question CTA.
Then give me all prompts (creator image, first frame image, one Seedance 2.5 prompt per shot).
```

Kết quả bạn nhận được sẽ có dạng như ví dụ dưới (đây là mẫu mình viết sẵn để bạn so, không bắt buộc dùng y nguyên).

### 2.3 Ví dụ kịch bản 20 giây (4 shot)
| Shot | Giây | Hình | Lời (creator nói) |
|---|---|---|---|
| 1 Hook | 0–4 | Selfie cận mặt, vừa ngồi xuống ghế, thở dài | "Okay, 2 p.m. and my brain is just… off." |
| 2 Sản phẩm | 4–9 | Lấy [PRODUCT] từ túi, giơ lên ngang mặt, nhãn hướng camera | "So I started keeping this in my bag." |
| 3 Dùng thử | 9–15 | Cận tay mở / dùng sản phẩm, rồi phản ứng tự nhiên | "Cold, smooth, not sweet. That's it. That's the review." |
| 4 CTA | 15–20 | Quay lại selfie, cười nhẹ | "[OFFER nếu có]. Would you try it?" |

---

## PHẦN 3 — Lên web tạo video

Quay màn hình từng bước này (mỗi bước 1 file). **Higgsfield** là đường chính; **Dreamina** là đường thay thế tương tự.

### 3.1 Tạo nhân vật (giữ cùng 1 người cho mọi shot)
Higgsfield → **Soul** (hoặc **AI Influencer**) · Dreamina → **AI Image** (Seedream 5.5).
```
Photorealistic portrait of a woman in her late twenties, friendly tired smile, messy low bun,
light makeup, oversized beige hoodie, sitting in a small sunlit apartment kitchen,
shot on iPhone front camera, vertical 9:16, natural skin texture, soft window light,
no text, no logos.
```
Tạo 4 ảnh → chọn 1 → lưu làm nhân vật (Soul / character). Tải ảnh về: `creator.png`.

### 3.2 Ảnh khung đầu: nhân vật cầm sản phẩm
Higgsfield → **Banana Placement** (hoặc Multi Reference / Edit Image) · Dreamina → AI Image + ảnh tham chiếu.
Upload `creator.png` + ảnh sản phẩm:
```
The same woman from image 1 holds the product from image 2 at chest height with her right hand,
label facing the camera and fully readable, same kitchen and light, vertical 9:16 selfie framing.
Keep the product shape, colours and label text exactly as in image 2.
```
Kiểm tra: nhãn đúng chữ, tay đủ 5 ngón. Sai thì tạo lại. Lưu `frame-shot2.png`. Làm tương tự 1 ảnh cho shot 1 (không cầm sản phẩm) và shot 3 (cận tay mở sản phẩm).

### 3.3 Tạo video từng shot với Seedance 2.5
Higgsfield → **Video → Seedance 2.5** · Dreamina → **AI Video → Seedance 2.5 Flash**.
Chế độ **Image to video**, upload ảnh khung đầu của shot, 9:16, thời lượng 5 s (shot 3: 6 s), bật âm thanh / giọng nói nếu có tuỳ chọn.

**Shot 1 — hook** (ảnh: creator ngồi ghế)
```
Handheld iPhone selfie video, vertical. The woman drops onto a kitchen chair, exhales,
looks into the camera and says in a casual tired voice: "Okay, 2 p.m. and my brain is just... off."
Slight natural camera shake, soft afternoon window light, realistic skin, no text on screen.
```
**Shot 2 — sản phẩm** (ảnh: frame-shot2.png)
```
Handheld selfie video, vertical. She lifts the [PRODUCT] up next to her face, label facing camera,
and says: "So I started keeping this in my bag." Small smile. Product label stays sharp and unchanged.
Natural light, realistic, no text on screen.
```
**Shot 3 — dùng thử** (ảnh: cận tay cầm sản phẩm)
```
Close-up, vertical, phone camera. Her hands open the [PRODUCT] and she [HOW IT IS USED, e.g. takes a sip / applies a drop to her cheek].
Cut to her face reacting, she says: "Cold, smooth, not sweet. That's it. That's the review."
Realistic hands, product keeps its exact shape and label, natural light.
```
**Shot 4 — CTA** (ảnh: creator selfie)
```
Handheld selfie video, vertical. She smiles at the camera and says: "[OFFER]. Would you try it?"
Then raises her eyebrows playfully. Soft light, realistic, no text on screen.
```
Mỗi shot tạo 2–4 bản, chọn bản đẹp nhất. Tải về `shot1.mp4` … `shot4.mp4`.

**Nếu nhân vật không nói / khẩu hình lệch:** tạo video không lời, rồi Higgsfield → **Lipsync Studio**:
upload video + gõ câu thoại (hoặc file giọng) → chọn giọng tự nhiên, nữ, Mỹ.

### 3.4 Ghép quảng cáo
CapCut (máy tính hoặc web): xếp shot1→4 → cắt bỏ khoảng lặng → thêm **phụ đề tự động** chữ trắng viền đen giữa khung
→ shot cuối thêm chữ ưu đãi + logo → xuất **1080×1920, 30 fps** → `ad-main.mp4`.

### 3.5 Làm 3 biến thể (quay lại chat bot)
```
Make 3 variations of this ad. Same product facts, same script length.
Change the creator and setting:
1. college student before class, campus cafe
2. nurse after a night shift, kitchen at dawn
3. dad at 6 a.m., hallway with a stroller
Give me the new creator image prompt and the 4 Seedance prompts for each.
```
Lặp lại 3.1 → 3.4 cho mỗi bản → `ad-student.mp4`, `ad-nurse.mp4`, `ad-dad.mp4`.
(Nhanh hơn: chỉ đổi nhân vật ở 3.1 và giữ nguyên prompt video.)

### 3.6 Lên chiến dịch (channel Management)
Upload 4 file vào Drive (hoặc chat), rồi gửi:
```
Launch these 4 [PRODUCT] ads on Meta as one test: one ad set, Sales objective, $25/day.
Prepare everything and wait for my OK.
```
Quay đến lúc bot đưa form / hỏi duyệt. **Không cần bấm chạy thật.**

---

## Cần gửi lại cho mình
- Quay màn hình: Phần 1 (tạo 2 bot), 2.1–2.2 (chat), 3.1–3.3 (trên web), 3.5–3.6.
- File: `creator.png`, các ảnh khung đầu, `shot1–4.mp4`, `ad-main.mp4` + 3 biến thể, ảnh sản phẩm.
- Tên + facts sản phẩm. Mình sẽ viết lại lời đọc video hướng dẫn khớp đúng những gì bạn đã làm.

## Lưu ý
- Nhân vật là AI, không phải người thật: đừng để nhân vật nói "tôi dùng x năm", "khỏi bệnh", hay số liệu bạn không chứng minh được.
  Khi đăng, bật nhãn nội dung AI nếu nền tảng yêu cầu.
- Không dùng mặt/giọng người thật (người nổi tiếng, creator khác) làm nhân vật.
- Credit: Seedance 2.5 tốn credit theo giây. Thử shot bằng 5 s trước, đúng ý mới làm bản dài.
