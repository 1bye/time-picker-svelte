<script lang="ts">
    import {
      DateFormatter,
      type DateValue,
      getLocalTimeZone,
      Time,
      now
    } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import { buttonVariants } from "$lib/components/ui/button";
    import { cn } from "$lib/utils";
    import TimePicker from "./time-picker.svelte";
  
    const df = new DateFormatter("en-US", {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23'
    });
  
    let contentRef = $state<HTMLElement | null>(null);
    let dateValue = $state<DateValue>();
  
    let {
      date = $bindable(
          now(getLocalTimeZone())
      ),
      setDate
    }: {
      date?: DateValue;
      setDate?: (date: DateValue) => void;
    } = $props();
  
    let time = $state(new Time(date?.hour ?? 0, date?.minute ?? 0));

    function onValueChange(_date: DateValue | undefined) {
      date = date?.set({
        year: _date?.year,
        month: _date?.month,
        day: _date?.day,
        minute: time.minute,
        hour: time.hour,
        second: time.second,
      });

      setDate?.(date);
    }
  
    function setTime(time: Time) {
      date = date?.set({
        minute: time.minute,
        hour: time.hour,
        second: time.second,
      });

      setDate?.(date);
    }
  </script>
  
  <Popover.Root>
    <Popover.Trigger
      class={cn(
        buttonVariants({
          variant: "outline",
          class: "w-[280px] justify-start text-left font-normal",
        }),
        !date && "text-muted-foreground"
      )}
    >
      <CalendarIcon />
      {date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date"}
    </Popover.Trigger>
    <Popover.Content bind:ref={contentRef} class="w-auto p-0">
      <div class="flex p-2 border-b">
        <TimePicker
          bind:time
          setTime={(time) => {
            time && setTime(time);
          }}
        />
      </div>

      <Calendar {onValueChange} type="single" bind:value={dateValue} />
    </Popover.Content>
  </Popover.Root>
  