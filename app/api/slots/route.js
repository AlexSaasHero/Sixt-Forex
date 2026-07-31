import { NextResponse } from 'next/server';
import { getSlots, updateSlot, getCronLogs } from '../../../lib/store';

export async function GET(request) {
  try {
    const slots = await getSlots();
    const logs = await getCronLogs();
    return NextResponse.json({ success: true, slots, logs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { slotId, location, startDate, endDate, category, maxPriceFlair, userEmail } = body;

    if (!slotId) {
      return NextResponse.json({ success: false, message: 'Slot ID is required' }, { status: 400 });
    }

    const updated = await updateSlot(slotId, {
      location,
      startDate,
      endDate,
      category,
      maxPriceFlair: maxPriceFlair ? Number(maxPriceFlair) : null,
      userEmail
    });

    return NextResponse.json({ success: true, slot: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
