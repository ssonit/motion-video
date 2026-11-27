# Kịch bản thao tác — làm theo từng bước, vừa làm vừa quay màn hình

Thay `[PRODUCT]` bằng tên sản phẩm, `[DESC]` bằng 1 câu mô tả (ví dụ: "ready-to-drink cold brew coffee, calm morning tone").
Prompt viết sẵn bằng tiếng Anh để khớp lời đọc của video; copy và dán nguyên văn. Mỗi bước = 1 file quay, đặt tên theo **mã cảnh** in đậm.
Bot trả lời lâu thì cứ để quay tiếp, mình sẽ cắt đoạn chờ.

---

## Phần A — Dựng bot studio

### A1. Cài app · `install`
1. Mở trình duyệt, vào `x.ai/bot` → bấm **Download** → cài → đăng nhập, làm xong onboarding.

### A2. Tạo channel · `app-tour`, `new-channel`
1. Rê chuột chậm qua thanh bên trái (danh sách channel và bot), giữ yên 3 giây.
2. Bấm **+ New channel** → gõ tên: `Ad Factory` → tạo.

### A3. Tạo bot · `new-bot`, `bot-desc`
1. Trong channel Ad Factory bấm **New Bot**.
2. Name: `AI UGC Studio`
3. Title: `Makes UGC-style video ads from a reference`
4. Description: `Brand: [PRODUCT] — [DESC]. Always keep claims truthful and simple.`

### A4. Gắn plugin · `plugins-open`, `plugins-search`, `plug-*`
Mở **Plugins** → gõ vào ô tìm kiếm → bấm **Add** lần lượt:
1. Plugin tạo video (Higgsfield hoặc plugin có Seedance)
2. `Google Drive`
3. Plugin nghiên cứu X
4. Plugin quảng cáo (ads connector có Meta)

### A5. Kiểm tra · `plug-check`
Gửi cho bot:
```
What tools do you have right now? List them one per line.
```
Chờ bot liệt kê đủ 4 cái. Thiếu cái nào thì quay lại A4 thêm vào.

---

## Phần B — Tìm quảng cáo mẫu

### B1. Tìm · `find-library`, `find-signal`, `find-comments`
1. Đổi ngôn ngữ Facebook sang English trước.
2. Vào `facebook.com/ads/library` → Country: United States → gõ loại sản phẩm của bạn → lọc **Active** + **Video**.
3. Lướt chậm, mở 2–3 quảng cáo có dòng "Started running on…" từ vài tuần trước hoặc có nhiều phiên bản. (Hoặc tìm trên TikTok, mở phần bình luận.)
4. Chọn 1 quảng cáo: **một người, một phòng, dưới 30 giây**. Copy link.

### B2. Cho bot tải về · `download`, `download-done`
```
[dán link] 
Download this video and tell me when it's done.
```
Chờ bot gửi lại video, bấm vào xem 3 giây.

---

## Phần C — Phân tích quảng cáo

### C1. Gửi hướng dẫn phân tích · `sop-send`
Tạo file `ad-breakdown-guide.txt` với nội dung dưới đây, kéo vào chat (hoặc dán thẳng), rồi gửi:

```
AD BREAKDOWN GUIDE
For the video I send, write:
1. HOOK: what happens in the first 2 seconds (picture + words).
2. CUTS: every cut with its timestamp.
3. SCENES: a table — time, what is on screen, camera framing, action.
4. SCRIPT: every spoken word, with timestamps. Count the words.
5. ON-SCREEN TEXT: every caption or label.
6. CTA: how the ad ends and what it asks the viewer to do.
7. WHY IT WORKS: 3 short bullet points.
Also make a contact sheet (a grid of frames, 1 per second) and save everything as breakdown.md.
```
Prompt gửi kèm:
```
Read this guide, then break down the full video using it.
```

### C2. Xem kết quả · `breakdown`, `breakdown-sheet`, `breakdown-hook`, `breakdown-words`
Cuộn chậm qua câu trả lời: bảng cảnh, kịch bản, contact sheet, file breakdown.md. Nếu bot chưa ghi số từ thì hỏi:
```
How many words are spoken, and where exactly does the product first appear?
```

### C3. Lưu thành skill · `breakdown-save`
```
Save this breakdown method as a skill called "Ad breakdown" so you can do the next video the same way.
```

---

## Phần D — Dựng lại với sản phẩm của bạn

### D1. Upload ảnh · `product-upload`
Kéo ảnh sản phẩm chính diện (nền trơn) vào chat.

### D2. Xem kịch bản mới trước · `product-prompt`, `script-new`
```
Recreate this ad with my product, [PRODUCT], shown in the photo.
Keep the same structure, timing and hook. Rewrite the script for [PRODUCT] with about the same number of words.
Do not invent results, medical effects or "I've used this for years" claims — describe a moment of using it instead.
Show me the new script first. Don't render yet.
```

### D3. Sửa 1 câu · `script-edit`
Chọn 1 câu bạn muốn đổi, ví dụ:
```
Change line 3 to: "[câu mới của bạn]". Keep everything else.
```

### D4. Chọn nhân vật + render · `voice-pick`, `render-steps`, `render-wait`
```
Creator: late twenties, friendly, a little sleepy, kitchen in soft morning light, vertical 9:16 phone-selfie style.
Now generate the video with Seedance 2.5 and tell me when it's ready.
```
Quay lúc bot liệt kê các bước và lúc báo xong.

### D5. Xem kết quả · `result`
Mở video bot gửi, phát toàn bộ. (Gửi mình cả file mp4 này.)

### D6. Sửa đoạn lỗi (nếu có) · `fix-bad`, `fix-prompt`
```
At 0:06–0:09 the label is blurry. Redo only that part and keep the rest.
```
(Đổi giây và lỗi cho đúng cái bạn thấy: tay lạ, nhãn méo, đổi màu…)

---

## Phần E — Làm 3 biến thể

### E1. · `vari-prompt`, `vari-who`
```
Make 3 variations of this ad with the same script and product, but different creators:
1. a college student before class, backpack, campus cafe
2. a nurse after a night shift, scrubs, kitchen at dawn
3. a dad at 6 a.m., stroller in the hallway
Generate all 3 at once and show them side by side.
```

### E2. Đổi câu mở đầu · `vari-hooks`
```
Give me 3 different first lines (hooks) for the same ad, under 10 words each.
```

### E3. Lưu vào Drive · `vari-drive`
```
Save the main ad and the 3 variations to a Google Drive folder called "[PRODUCT] ads", named ad-main, ad-student, ad-nurse, ad-dad.
```
Mở Drive cho thấy thư mục có 4 file.

---

## Phần F — Bot chạy quảng cáo

### F1. Channel + bot thứ hai · `mgr-channel`, `mgr-bot`, `mgr-team`
1. **+ New channel** → `Management` → thêm **AI UGC Studio** vào.
2. **New Bot** → Name `Ads Manager`, Title `Launches and watches our ad campaigns` → thêm vào Management.
3. Gắn plugin ads connector cho Ads Manager.

### F2. Ra lệnh launch · `launch-msg`, `launch-handoff`, `launch-yes`
Trong channel Management:
```
Launch my 3 new [PRODUCT] ads on Meta. AI UGC Studio, please hand the files to Ads Manager.
```
Bot hỏi lại (ví dụ "one ad set?") thì trả lời:
```
Yes — one ad set, same budget, so they compete fairly.
```

### F3. Nếu bot báo thiếu gì · `launch-blocker`
Ví dụ chưa kết nối Facebook page: bấm kết nối theo hướng dẫn của bot, rồi báo `Done`.

### F4. Giới hạn ngân sách · `launch-cap`, `launch-form`, `launch-approve`
```
Objective: Sales. Budget: $25 per day. Never spend more than $25 a day without asking me.
Prepare everything, but wait for my OK before anything goes live.
```
Quay form chiến dịch bot điền xong. **Dừng ở bước duyệt** (không bấm chạy thật, trừ khi bạn muốn chạy).

### F5. Luật theo dõi + routine · `watch-rule`, `watch-routine`
```
Rule: after 3 days, pause the weakest ad and move its budget to the best one.
Every morning at 9:00, post a short report here: stop rate, click rate, cost per sale for each ad.
AI UGC Studio: after each report, make 2 new versions of the winning ad.
```
Quay lúc bot xác nhận đã tạo routine.

---

## Gửi cho mình
- Các file quay màn hình (A1 → F5), mp4 quảng cáo chính + 3 biến thể, video tham khảo, ảnh sản phẩm, clip sản phẩm (xem `huong-dan-quay.md`).
- Tên sản phẩm + mô tả + ưu đãi (nếu có).
- Bot trả lời khác với ở đây cũng không sao: cứ quay đúng cái thật, mình viết lại lời đọc khớp với màn hình.
