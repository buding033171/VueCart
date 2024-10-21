商品購物車

VueCart 是一個使用 Vue 3 和 Vite 建立的前端項目，旨在提供響應式且動態的購物車體驗。

![image](https://github.com/user-attachments/assets/f38706ef-b047-432a-a1b9-ce140543d203)
![image](https://github.com/user-attachments/assets/f8d2138d-ff5b-4585-88ab-8cbda1860951)
![image](https://github.com/user-attachments/assets/936e7794-3f65-48b5-be06-9645c6520b85)

專案的運行方式

```
npm install
安裝專案所需要的套件

npm run dev
啟動後，你可以在瀏覽器中訪問 http://localhost:5173/ 。

npm run build
壓縮打包
```
- 專案結構

將商品跟折價優惠的資料存放在 cartStroe ，透過 cartStroe 寫好的動作
去計算並同時更新狀態。

- 實現思路

透過 Pinia 的狀態管理功能，讓事先定義好的商品資料跟優惠碼存放在 Pinia
的 state 狀態中，在 action 定義新增刪除的動作做到商品的更新確保使用
者互動的更新，getters 這邊定義好的優惠碼計算去管理購物車的價格以及套
用優惠碼後的價格。

- **使用的主要技術**

  Vue 3：用於建立使用者介面的漸進式 JavaScript 框架。  
  Vite：現代 Web 開發的快速建置工具。  
  Pinia：使用 Pinia 進行購物車的狀態管理。

- 遇到的挑戰和解決方案

我希望可以將商品資訊跟優惠碼資訊存在一個檔案中，然後原本是打算購物車跟商
品列表分成兩個檔案，讓需要時可以去抓取資料，並且點級商品後同時更新購物車
的檔案，但是在這當中遇到了如何跨元件的處理狀態更新，後來再尋找答案時發現
Pinia 這個狀態管理工具可以做到跨元件的傳遞資料而且還有其他內建方法，後來
透過 Pinia 實現了資料存放跟狀態管理而且在其他檔案引入透過 Pinia 寫好的
useCartStore 引入去實現跨元件的狀態共享跟狀態管理
