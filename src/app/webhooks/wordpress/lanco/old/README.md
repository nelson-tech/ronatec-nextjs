# Old Lanco Webhook Code

This directory contains archived code from the previous Lanco webhook implementation.

## Archived on: November 24, 2025

## Reason for Archive

The webhook system was rebuilt from scratch to address critical issues:

1. **Stock Management Issue**: Products remained published on our site even when Lanco set their stock to 0, causing customers to attempt purchases of unavailable items.

2. **Limited Stock Handling**: Only used `stock_quantity`, ignored the `stock_status` field from WooCommerce.

3. **No Visibility**: No logging system to monitor incoming webhook data or debug issues.

4. **Complex Logic**: The formatProduct function had grown complex and hard to maintain.

## What Was Replaced

### Old Files (in this folder):

- `productActions/` - Old action handlers for create/update/delete
  - `index.ts` - Main action router
  - `updateProduct.ts` - Product update logic
  - `deleteProduct.ts` - Product deletion logic
- `formatProduct.ts` - Complex product data formatter
- `findMatchingDocument.ts` - Helper to find products (still used, copied for reference)

### New Implementation (in parent `processor/` folder):

- `lancoProductProcessor.ts` - Clean, single-purpose processor with stock logic
- `dataMapper.ts` - Pure function for WooCommerce → Payload mapping
- `loggingService.ts` - Comprehensive webhook logging system

## Key Improvements in New System

1. **Auto-Draft Out-of-Stock**: Products automatically set to draft when `stock_quantity = 0` or `stock_status = 'outofstock'`
2. **Auto-Publish Back in Stock**: Products return to published when restocked
3. **Full Logging**: Every webhook logged with processing details (when enabled in settings)
4. **Better Stock Logic**: Uses both `stock_status` AND `stock_quantity` fields
5. **Error Recovery**: Logs are created even if processing fails
6. **Cleaner Code**: Separated concerns, easier to debug and maintain

## How to Restore (if needed)

If you need to temporarily restore the old system:

1. Copy files from this folder back to their original locations
2. Update `/lanco/route.ts` to use the old productActions
3. Remember: the old system has the stock management bug!

## Safe to Delete?

**Not Yet!** Keep this archived code for at least 2-3 months after the new system is verified working correctly. This provides a safety net if any issues arise with the new implementation.

After the new system has been proven reliable in production, this folder can be safely deleted.
