import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
})
export class RangeSliderComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const minThumb = document.getElementById('min-thumb') as HTMLElement;
    const maxThumb = document.getElementById('max-thumb') as HTMLElement;
    const rangeBar = document.querySelector('.range-bar') as HTMLElement;
    const minValueElement = document.getElementById('min-value') as HTMLElement;
    const maxValueElement = document.getElementById('max-value') as HTMLElement;

    let isDragging = false;

    const minValue = 0;
    const maxValue = 10000;

    const range = maxValue - minValue;

    minThumb.addEventListener('mousedown', () => {
      isDragging = true;
    });

    maxThumb.addEventListener('mousedown', () => {
      isDragging = true;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const rangeRect = rangeBar.getBoundingClientRect();
      const offsetX = e.clientX - rangeRect.left;
      const percentage = (offsetX / rangeRect.width) * 100;

      if (percentage >= 0 && percentage <= 100) {
        if (minThumb) {
          minThumb.style.left = percentage + '%';
          const selectedValue =
            Math.round((minValue + (percentage / 100) * range) * 100) / 100;
          minValueElement.innerText = selectedValue.toString();
        }
      }
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Inicijalna postavka vrednosti
    if (minThumb) {
      minThumb.style.left = '0%';
    }
    if (maxValueElement) {
      maxValueElement.innerText = maxValue.toString();
    }
  }
}
