import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../core/data-access/admin.service';
import { MaterialModule } from '../../../core/feature/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SortByFieldPipe } from '../../../core/pipes/sort-by-field.pipe';
import { SumByFieldPipe } from '../../../core/pipes/sum-by-field.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MaterialModule,
    SortByFieldPipe,
    ReactiveFormsModule,
    SumByFieldPipe,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  adminService = inject(AdminService);

  interval = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  statistics: any;
  productsStats: any;
  usersStats: any;

  ngOnInit(): void {
    this.adminService.getStatistics().subscribe((res: any) => {
      this.statistics = res;
      this.setStats(this.getStats());
    });
    this.interval.valueChanges.subscribe((res) => {
      if (!(res.start && res.end)) {
        this.setStats(this.getStats());
        return;
      }
      let stats = this.getStats();
      res.end.setDate(res.end.getDate() + 1);
      this.setStats({
        productsStats: stats.productsStats.map((el: any) => {
          el.stats = el.stats.filter((item: any) => {
            let date = new Date(item.date);
            return res.start <= date && date <= res.end;
          });
          return el;
        }),
        usersStats: stats.usersStats.map((el: any) => {
          el.stats = el.stats.filter((item: any) => {
            let date = new Date(item.date);
            return res.start <= date && date <= res.end;
          });
          return el;
        }),
      });
      console.log(this.productsStats);
    });
  }

  clear() {
    this.interval.setValue({
      start: null,
      end: null,
    });
  }

  getStats() {
    return {
      productsStats: Object.entries(this.statistics.productsStats).map(
        ([key, value]: any) => {
          return {
            id: key,
            ...value,
          };
        }
      ),
      usersStats: Object.entries(this.statistics.usersStats).map(
        ([key, value]: any) => {
          return {
            id: key,
            ...value,
          };
        }
      ),
    };
  }

  setStats(stats: any) {
    stats.productsStats.map((el: any) => {
      el.orders = el.stats.length;
      el.price = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.price || 0),
        0
      );
      el.amount = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.amount || 0),
        0
      );
    });
    this.productsStats = [...stats.productsStats];
    stats.usersStats.map((el: any) => {
      el.orders = el.stats.length;
      el.price = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.price || 0),
        0
      );
      el.amount = el.stats.reduce(
        (sum: any, obj: any) => sum + (obj.amount || 0),
        0
      );
    });
    this.usersStats = [...stats.usersStats];
  }
}
