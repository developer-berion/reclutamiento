# Deploy to Hostinger (Static)

1.  **Build the Project:**
    Run the build command to generate the `dist` folder.
    ```bash
    npm run build
    ```

2.  **Locate Output:**
    The built files will be in the `dist/` directory.

3.  **Upload:**
    *   Access Hostinger File Manager (public_html).
    *   Upload the **contents** of the `dist/` folder (index.html, assets/, etc.) directly to `public_html` (or your desired subdirectory).

4.  **Base Path (Optional):**
    If deploying to a subdirectory (e.g., `domain.com/landing/`), update `vite.config.js`:
    ```javascript
    export default defineConfig({
      base: '/landing/',
      plugins: [react()],
    })
    ```
    Then rebuild before uploading.
