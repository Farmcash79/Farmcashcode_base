PROPOSE FLOW FOR MVP

```bash
User clicks "Fund Wallet"
        ↓
/api/payments/initiate
        ↓
Create transaction (PENDING)
        ↓
Return Interswitch checkout form
        ↓
User completes payment
        ↓
Redirect to /payment/return
        ↓
/api/payments/confirm
        ↓
Call Interswitch API (verify)
        ↓
If SUCCESS:
    - Update transaction
    - Increment wallet
        ↓
Redirect to dashboard
```
