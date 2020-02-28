import 'materialize-css/dist/js/materialize.js';
import { ElementRef } from '@angular/core';
declare var M;

export interface MaterialInstance {
  open?(): void;
  close?(): void;
  destroy?(): void;
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date;
}
export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message });
  }

  static initializeFloatingButton(ref: ElementRef): MaterialInstance  {

    return M.FloatingActionButton.init(ref.nativeElement);
  }

  static initializeSlider(ref: ElementRef): MaterialInstance  {

    return M.Slider.init(ref.nativeElement);
  }

  static initializeNavbar(ref: ElementRef): MaterialInstance  {

    return M.Dropdown.init(ref.nativeElement);
  }

  static initializeSelect(ref: ElementRef): MaterialInstance {

    return M.FormSelect.init(ref.nativeElement);
  }

  static initializeSideBar(ref: ElementRef): MaterialInstance {
    const opts = {
      edge: 'left',
      draggable: true,
    };
    return M.Sidenav.init(ref.nativeElement, opts);
  }


  static initializeParallax(ref: ElementRef): MaterialInstance {
    const opts = {
      responsiveThreshold: 0
    };
    return M.Parallax.init(ref.nativeElement, opts);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatepicker(ref: ElementRef, onClose: () => void) {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'yyyy.mm.dd',
      showClearBtn: true,
      onClose
    });
  }

  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement);
  }
}
