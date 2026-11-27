# Hướng dẫn quay — Grok Bot + UGC ad factory

Bạn quay **không cần nói** (giọng đọc là TTS của mình). Quay xong bỏ hết file vào
`D:\Project\motion-video\footage\grok-ugc\raw\` rồi nhắn mình. Mình chạy `ingest.py scan`, xem từng clip,
gắn vào từng cảnh, phần nào thiếu thì vẽ bằng đồ hoạ như storyboard cũ.

Mỗi mục dưới đây ghi **mã cảnh** (khớp `storyboard.md`). Không cần quay đủ hết: ưu tiên ★ trước.

---

## 0. Thông số chung
| | Điện thoại (sản phẩm, tay) | Quay màn hình máy tính |
|---|---|---|
| Khung | **Dọc 9:16** cho cảnh "quảng cáo UGC"; **ngang 16:9** cho cảnh sản phẩm/b-roll | Toàn màn hình, 1920×1080 trở lên |
| Chất lượng | 1080p hoặc 4K, **30 fps** (đừng để 60/120 fps hay chế độ slow-mo) | 30 fps, có con trỏ chuột |
| Âm thanh | Không quan trọng (mình tắt tiếng) | Không cần |
| Độ dài | Mỗi cảnh **8–15 giây**, giữ yên 2 giây ở đầu và cuối | Cứ quay liền, mình tự cắt |

- Ánh sáng: cạnh cửa sổ ban ngày, tránh đèn vàng trực tiếp. Không bật filter, không zoom số.
- Cố định máy (tựa vào chồng sách / tripod). Cảnh cầm tay thì di chuyển chậm.
- **Lau sạch sản phẩm, nhãn quay thẳng về ống kính**, chữ trên nhãn phải đọc được.
- Nền gọn: bàn trơn, tường trơn. Che/cất đồ có thương hiệu khác.
- Không cần mặt người. Nếu có tay/người lọt vào thì phải là bạn hoặc người đã đồng ý.

## 1. Sản phẩm thật (thay cho "Driftwood Cold Brew")
| ★ | Mã cảnh | Quay gì | Khung |
|---|---|---|---|
| ★ | `product-upload` | **Ảnh** sản phẩm chính diện trên nền trắng/trơn (đây cũng là ảnh bạn upload cho bot). Chụp 3 ảnh: chính diện, nghiêng 45°, mặt sau | ảnh |
| ★ | `hook-toc3`, `why-need` | Sản phẩm đặt trên bàn, tay đưa vào cầm lên, xoay nhẹ cho thấy nhãn | ngang |
| ★ | `proof-demo`, `result` | Cảnh "dùng" sản phẩm: mở nắp / rót / bôi / bóc hộp (tuỳ sản phẩm), quay cận | dọc |
|   | `hook-cold` | Sản phẩm cận cảnh, máy trượt chậm ngang qua (5–8 s) | dọc |
|   | `proof-story` | Sản phẩm đặt ở bối cảnh dùng thật (bàn làm việc, bếp, túi xách…) | dọc |
|   | `outro-start` | Sản phẩm đứng yên giữa khung, nền trơn, giữ 5 s | ngang |

## 2. Quay màn hình Grok Bot (giá trị nhất, thay cả phần đồ hoạ)
Quay bằng **Win + Alt + R** (Xbox Game Bar) hoặc OBS. Mỗi bước 1 file, đặt tên theo mã cảnh.
Làm thật từng bước như video gốc, quay lại toàn bộ quá trình:

| ★ | Mã cảnh | Thao tác cần quay |
|---|---|---|
|   | `install` | Vào x.ai/bot, bấm Download, mở app lần đầu |
| ★ | `app-tour`, `new-channel` | Màn hình chính → tạo channel mới tên **Ad Factory** |
| ★ | `new-bot`, `bot-desc` | New Bot → gõ tên **AI UGC Studio**, title, description về sản phẩm của bạn |
| ★ | `plugins-*` | Mở Plugins → tìm và Add: video generation, Google Drive, X research, ads connector |
|   | `plug-check` | Hỏi bot "What tools do you have?" và để nó trả lời |
|   | `find-library` | Lướt Meta Ad Library / TikTok tìm một quảng cáo cùng ngành (đổi ngôn ngữ Facebook sang **English** trước khi quay) |
| ★ | `download` | Dán link quảng cáo vào chat + "download this video and tell me when it's done" → chờ bot trả lời |
| ★ | `sop-send`, `breakdown*` | Gửi file hướng dẫn phân tích + "read this, then break down the full video" → kéo xem kết quả |
| ★ | `product-prompt`, `script-new` | Upload ảnh sản phẩm + prompt dựng lại quảng cáo → xem kịch bản mới |
| ★ | `render-wait` | Lúc bot báo đang render / xong |
|   | `fix-prompt` | Nếu có bản lỗi: nhắn bot sửa đúng đoạn giây đó |
| ★ | `vari-prompt`, `vari-grid` | "make 3 variations with different creators" → kết quả 3 bản |
| ★ | `mgr-*` | Tạo channel **Management**, bot **Ads Manager**, thêm cả 2 bot vào |
| ★ | `launch-*` | Gửi "launch my 3 new ads on Meta…" → 2 bot nói chuyện → form chiến dịch → **dừng ở bước duyệt, không cần bấm chạy thật** |
|   | `watch-routine` | Tạo routine báo cáo 9h sáng |

**Trước khi quay màn hình:** đóng tab/email cá nhân, tắt thông báo (Focus Assist), ẩn số dư/thẻ/API key.
Nếu lỡ lộ gì thì ghi lại giây đó, mình sẽ làm mờ.

## 3. Video quảng cáo AI mà bot làm ra
Đây là "kết quả" của cả video. Gửi mình **file mp4 gốc** (tải từ Drive/chat của bot):
- ★ bản quảng cáo chính (`result`), ★ 3 biến thể (`vari-grid`), và 2–3 quảng cáo khác nếu có (`proof-list`, `proof-story`, `proof-demo`, `hook-cold`).
- Gửi kèm **video tham khảo** bạn đã cho bot phân tích (để làm cảnh so sánh `result-compare`; mình chỉ dùng thu nhỏ có ghi nguồn, bạn quyết bản quyền).

⚠️ Nội dung quảng cáo AI: không để nhân vật AI nói kết quả bịa ("nó chữa khỏi…", "tôi dùng 5 năm rồi").
Phần cuối video của mình nói đúng điều này, nên chính quảng cáo mẫu cũng phải sạch.

## 4. Đặt tên file & gửi
- Đặt tên theo mã cảnh: `product-upload_1.jpg`, `download.mp4`, `result.mp4`, `vari-1.mp4`… (tên khác cũng được, mình sẽ xem và tự gắn).
- Bỏ tất cả vào `footage\grok-ugc\raw\` (tạo sẵn rồi). File lớn cứ để nguyên, đừng nén lại.
- Nhắn mình: **tên sản phẩm, 1–2 câu mô tả, giá/ưu đãi nếu muốn đưa vào** → mình viết lại kịch bản theo sản phẩm thật
  rồi gửi bạn duyệt lại trước khi dựng.

## Checklist ngắn
- [ ] 3 ảnh sản phẩm nền trơn
- [ ] 3–5 clip sản phẩm (cầm lên, dùng thử, bối cảnh)
- [ ] Quay màn hình các bước ★ trong Grok Bot
- [ ] mp4 quảng cáo chính + 3 biến thể (+ video tham khảo)
- [ ] Tên + mô tả sản phẩm
